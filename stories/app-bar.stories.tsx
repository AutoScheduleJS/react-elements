import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';

import { AppBar } from '../src/app-bar/app-bar';
import { ThemeProvider } from 'emotion-theming';

const classFlex = css`
  display: flex;
`;

storiesOf('Component/Material/AppBar', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('default', () => <AppBar>Subarashi AppBar</AppBar>)
  .add('with custom theme', () => (
    <ThemeProvider
      theme={{
        appBar: {
          elevation: 12,
          totalHeight: '100px',
        },
      }}
    >
      <AppBar>Subarashi AppBar</AppBar>
    </ThemeProvider>
  ));
