from tutor import hooks

hooks.Filters.ENV_PATCHES.add_item(
    (
        "mfe-env-config-runtime-definitions-ora-grading",
        """
// Runtime plugin configuration injected by Tutor
const { PLUGIN_OPERATIONS, DIRECT_PLUGIN } = await import('@openedx/frontend-plugin-framework');

const { default: CustomCourseHeader } = await import('./src/components/CustomCourseHeader');

{% raw %}

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
            RenderWidget: () => <></>,
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
            RenderWidget: () => <></>,
          },
        },
      ],
    },
  };
};

// Attach plugin slots to runtime config
config.pluginSlots = getPluginSlots();

{% endraw %}
"""
    )
)
