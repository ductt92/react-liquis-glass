import * as React from 'react';
import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'liquidglass-ui';
import 'liquidglass-ui/styles.css';
import './preview.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Light / dark',
      toolbar: { title: 'Theme', icon: 'mirror', items: ['light', 'dark'], dynamicTitle: true },
    },
    wallpaper: {
      description: 'Background behind the glass',
      toolbar: { title: 'Wallpaper', icon: 'photo', items: ['aurora', 'sunset', 'ocean', 'plain'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light', wallpaper: 'aurora' },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    options: { storySort: { order: ['Introduction', 'Icons', 'General', 'Layout', 'Data Entry', 'Data Display', 'Navigation', 'Feedback'] } },
  },
  decorators: [
    (Story, ctx) => {
      const theme = ctx.globals.theme === 'dark' ? 'dark' : 'light';
      return (
        <div className={`sb-wallpaper sb-${ctx.globals.wallpaper ?? 'aurora'} sb-${theme}`}>
          <ConfigProvider theme={theme}>
            <div className="sb-stage">
              <Story />
            </div>
          </ConfigProvider>
        </div>
      );
    },
  ],
};
export default preview;
