import { color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import { AppBarContentLarge } from '../src/app-bar-content/app-bar-content-large';
import { AppBar } from '../src/app-bar/app-bar';
import { ThemeContext } from '../src/util/theme';

const classFlex = css`
  display: flex;
`;

storiesOf('Component/Material/AppBarContent', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('default', () => (
    <AppBar>
      <AppBarContentLarge title={'Subarashi AppBar content'} />
    </AppBar>
  ))
  .add('with custom theme', () => (
    <ThemeContext.Provider
      value={{
        appBar: {
          elevation: 12,
          totalHeight: '100px',
          backgroundColor: color('Background color', '#76ff03'),
          color: color('Color', '#000000'),
        },
      }}
    >
      <AppBar>
        <AppBarContentLarge title={'Subarashi AppBar content'} />
      </AppBar>
    </ThemeContext.Provider>
  ));
