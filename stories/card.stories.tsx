import { color, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import { CardProps } from '../src/card/card';
import { mergeProps } from '../src/util/hoc.util';
import { ThemeContext } from '../src/util/theme';

const classFlex = css`
  display: flex;
`;

const squareClass = {
  className: css`
    height: 150px;
    width: 150px;
    border: 2px dashed black;
    border-radius: 4px;
  `,
};

const customShape = css`
  background-image: linear-gradient(to bottom, rgba(255, 255, 0, 0.5), rgba(0, 0, 255, 0.5));
  border-radius: 50%;
`;

const customThemeFn = () => ({
  card: {
    restElevation: number('rest elevation', 4),
    activeElevation: number('active elevation', 8),
    color: color('color', '#000000'),
    backgroundColor: color('background color', '#ffffff'),
    shape: customShape,
  },
});

export const CardComponentTest = (props: any) => {
  const customTheme = React.useContext(ThemeContext);
  return <div {...mergeProps(props, squareClass, CardProps({ isClickable: true, customTheme }))} />;
};

storiesOf('Props/Card', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('default, clickable', () => <CardComponentTest />)
  .add('with custom theme', () => (
    <ThemeContext.Provider value={customThemeFn()}>
      <CardComponentTest />
    </ThemeContext.Provider>
  ));
