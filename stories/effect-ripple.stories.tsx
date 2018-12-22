import { color, number } from '@storybook/addon-knobs';
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
    border: 2px dashed black;
    border-radius: 4px;
  `,
};

const customShape = css`
  background-image: linear-gradient(to bottom, rgba(255, 255, 0, 0.5), rgba(0, 0, 255, 0.5));
  border-radius: 50%;
`;

storiesOf('Props/EffectRipple', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('default', () => <div {...mergeProps(squareClass, EffectRippleProps())} />)
  .add('with custom theme', () => (
    <div
      {...mergeProps(
        squareClass,
        EffectRippleProps({
          effectRiple: {
            color: color('Color', '#0080ff'),
            duration: number('Duration', 2000),
            shape: customShape,
          },
        })
      )}
    />
  ));
