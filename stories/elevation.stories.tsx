import { color, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import { ElevationProps } from '../src/elevation/elevation';
import { mergeProps } from '../src/util/hoc.util';
import { ElevationComponentTest } from './elevation.stories.comp';

const classFlex = css`
  display: flex;
  justify-content: center;
`;

const squareClass = {
  className: css`
    height: 150px;
    width: 150px;
    background-color: grey;
    border-radius: 4px;
  `,
};

const knobNumberOpt = { min: 0, max: 24, step: 1, range: false };

storiesOf('Props/Elevation', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('simple', () => (
    <div {...mergeProps(squareClass, ElevationProps(number('Elevation', 5, knobNumberOpt)))} />
  ))
  .add('with custom theme', () => (
    <div
      {...mergeProps(
        squareClass,
        ElevationProps(number('Elevation', 11, knobNumberOpt), {
          shadows: {
            baselineColor: color('Shadow color', '#4527a0'),
          },
        })
      )}
    />
  ))
  .add('with state handler', () => <ElevationComponentTest {...squareClass} />);
