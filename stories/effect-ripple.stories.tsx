import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import { EffectRippleProps } from '../src/effect-ripple/effect-ripple';
import { mergeProps } from '../src/util/hoc.util';

const classFlex = css`
  display: flex;
`;

const squareClass = {
  className: css`
    height: 150px;
    width: 150px;
  `,
};

storiesOf('EffectRipple', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('default', () => <div {...mergeProps(squareClass, EffectRippleProps())} />)
  .add('with custom theme', () => (
    <div
      {...mergeProps(squareClass, EffectRippleProps({ palette: { primary: { on: '#0080ff' } } }))}
    />
  ));
