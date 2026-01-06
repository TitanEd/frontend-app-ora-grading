import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FooterSlot from '@openedx/frontend-slot-footer';
import { LearningHeader as Header } from '@edx/frontend-component-header';

import { selectors } from 'data/redux';

import DemoWarning from 'containers/DemoWarning';
import CTA from 'containers/CTA';
import NotificationsBanner from 'containers/NotificationsBanner';
import ListView from 'containers/ListView';
import './App.scss';
import Head from './components/Head';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

export const App = ({ courseMetadata, isEnabled }) => (
    <div>
      <Head />
      <PluginSlot
        id="ora_header_plugin_slot"
        pluginProps={{
          courseTitle: courseMetadata.title,
        }}
      >
        <Header
          courseTitle={courseMetadata.title}
          courseNumber={courseMetadata.number}
          courseOrg={courseMetadata.org}
          data-testid="header"
        />
      </PluginSlot>
      {!isEnabled && <DemoWarning />}
      <PluginSlot
        id="ora_banner_plugin_slot"
        pluginProps={{
        }}
      >
        <CTA />
        <NotificationsBanner />
      </PluginSlot>
      <main data-testid="main">
        <ListView />
      </main>
      <PluginSlot
        id="ora_footer_plugin_slot"
        pluginProps={{
        }}
      >
        <FooterSlot />
      </PluginSlot>
    </div>
);
App.defaultProps = {
  courseMetadata: {
    title: '',
    number: null,
    org: '',
  },
};
App.propTypes = {
  courseMetadata: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.string,
    org: PropTypes.string,
  }),
  isEnabled: PropTypes.bool.isRequired,
};

export const mapStateToProps = (state) => ({
  courseMetadata: selectors.app.courseMetadata(state),
  isEnabled: selectors.app.isEnabled(state),
});

export default connect(mapStateToProps)(App);
