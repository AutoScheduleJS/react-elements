import { withKnobs } from '@storybook/addon-knobs';
import { withOptions } from '@storybook/addon-options';
import { themes } from '@storybook/components';
import { addDecorator, configure } from '@storybook/react';
import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// automatically import all files ending in *.stories.tsx
const req = require.context('../stories', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configureViewport({
  viewports: {
    ...INITIAL_VIEWPORTS,
  },
});
addDecorator(withKnobs);
addDecorator(
  withOptions({
    theme: themes.dark,
  } as any)
);

configure(loadStories, module);
