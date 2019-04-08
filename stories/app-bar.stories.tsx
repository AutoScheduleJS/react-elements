import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import { AppBar } from '../src/app-bar/app-bar';
import { ThemeContext } from '../src/util/theme';

const classFlex = css`
  display: flex;
`;

storiesOf('Component/Material/AppBar', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('default', () => <AppBar>Subarashi AppBar</AppBar>)
  .add('with custom theme', () => (
    <ThemeContext.Provider
      value={{
        appBar: {
          elevation: 12,
          totalHeight: '100px',
        },
      }}
    >
      <AppBar>Subarashi AppBar</AppBar>
    </ThemeContext.Provider>
  ));
