/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import store from 'data/store';
import {
  APP_READY,
  APP_INIT_ERROR,
  initialize,
  subscribe,
  mergeConfig,
  getConfig,
} from '@edx/frontend-platform';
import { getMessages, IntlProvider } from '@edx/frontend-platform/i18n';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { dynamicTheme } from 'titaned-frontend-library';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';
import App from './App';

import messages from './i18n';

const loadStylesForNewUI = (isOldUI) => {
  document.body.className = isOldUI ? 'old-ui' : 'new-ui';
  document.documentElement.className = isOldUI ? 'old-ui' : 'new-ui';

  if (!isOldUI) {
    import('titaned-frontend-library/dist/index.css');
    import('./styles/styles-overrides.scss');
  } else {
    import('./styles/old-ui.scss');
  }
};

const MainApp = () => {
  const [oldUI, setOldUI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuConfig, setMenuConfig] = useState(null);

  useEffect(() => {
    const loadUIPreference = async () => {
      try {
        const localStorageValue = localStorage.getItem('oldUI') || 'false';
        setOldUI(localStorageValue);
        setLoading(false);

        const response = await getAuthenticatedHttpClient().get(`${getConfig().STUDIO_BASE_URL}/titaned/api/v1/menu-config/`);
        if (response.status === 200 && response.data) {
          setMenuConfig(response.data);

          const useNewUI = response.data.use_new_ui === true;
          const apiOldUIValue = !useNewUI ? 'true' : 'false';
          if (localStorageValue !== apiOldUIValue) {
            localStorage.setItem('oldUI', apiOldUIValue);
            window.location.reload();
          }
        } else {
          setMenuConfig({});
        }
      } catch (error) {
        console.error('Error fetching menu config:', error);
        setMenuConfig({});
      }
    };
    loadUIPreference();
  }, []);

  useEffect(() => {
    if (oldUI === 'false') {
      (async () => {
        try {
          const response = await getAuthenticatedHttpClient().get(`${getConfig().LMS_BASE_URL}/titaned/api/v1/mfe_context/`);
          dynamicTheme(response);
        } catch (error) {
          console.error('Error fetching theme config:', error);
        }
      })();
    }
  }, [oldUI]);

  useEffect(() => {
    if (oldUI !== null) { loadStylesForNewUI(oldUI === 'true'); }
  }, [oldUI]);

  if (loading || menuConfig === null) {
    return <div className="d-flex justify-content-center align-items-center vh-100">Loading... Please wait...</div>;
  }

  return (
    <AppProvider store={store} wrapWithRouter={false}>
      <Router>
        {oldUI === 'true' ? <App /> : <Layout />}
      </Router>
    </AppProvider>
  );
};

subscribe(APP_READY, () => {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <StrictMode>
      <IntlProvider locale={getConfig().language || 'en'} messages={getMessages()}>
        <MainApp />
      </IntlProvider>
    </StrictMode>,
  );
});

// subscribe(APP_READY, () => {
//   ReactDOM.render(
//     <AppProvider store={store} wrapWithRouter={false}>
//       <App />
//     </AppProvider>,
//     document.getElementById('root'),
//   );
// });

subscribe(APP_INIT_ERROR, (error) => {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <StrictMode>
      <ErrorPage message={error.message} />
    </StrictMode>,
  );
});

export const appName = 'OraGradingAppConfig';

initialize({
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL || null,
      }, appName);
    },
  },
  messages,
  requireAuthenticatedUser: true,
});
