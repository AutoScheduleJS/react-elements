import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';

import { mergeProps } from '../src/util/hoc.util';
import { EffectRippleProps } from '../src/effect-ripple/effect-ripple';

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
  .add('default', () => (
    <div className={classFlex}>
      <div
        {...mergeProps(squareClass, EffectRippleProps())}
      />
    </div>
  ))
  .add('with custom theme', () => (
    <div className={classFlex}>
      <div
        {...mergeProps(squareClass, EffectRippleProps({ palette: { primary: { on: '#0080ff	' } } }))}
      />
    </div>
  ));
