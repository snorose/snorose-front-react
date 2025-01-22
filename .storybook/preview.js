/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
