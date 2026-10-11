from tutor import hooks

hooks.Filters.ENV_PATCHES.add_item(
    (
        "mfe-env-config-runtime-definitions-ora-grading",
        """
// Runtime plugin configuration injected by Tutor
const { PLUGIN_OPERATIONS, DIRECT_PLUGIN } = await import('@openedx/frontend-plugin-framework');

const { default: CustomLayout } = await import('./src/CustomLayout');

{% raw %}

const getPluginSlots = () => {
  return {
    // Replaces the stock ORA grading app (src/index.jsx) with the custom UI.
    app_layout_plugin_slot: {
      keepDefault: false,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Hide,
          widgetId: 'default_contents',
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'custom_app_layout',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: () => <CustomLayout />,
          },
        },
      ],
    },
  };
};

config.pluginSlots = getPluginSlots();

{% endraw %}
""",
    )
)
