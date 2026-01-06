import React from 'react';


import {
  DIRECT_PLUGIN,
  PLUGIN_OPERATIONS,
} from '@openedx/frontend-plugin-framework';

import CustomCourseHeader from './src/components/CustomCourseHeader';


const getPluginSlots = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('oldUI') === 'true') {
    return {};
  }

  return {
    ora_header_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'ora_header_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomCourseHeader {...props} />,
          },
        },
      ],
    },
    ora_footer_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'ora_footer_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <></> ,
          },
        },
      ],
    },
    ora_banner_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'ora_banner_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <></> ,
          },
        },
      ],
    },
  };
}

// Load environment variables from .env file
const config = {
  ...process.env,
  get pluginSlots() {
    return getPluginSlots();
  },
};

export default config;