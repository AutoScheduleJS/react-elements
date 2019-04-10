import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import { breakpoints, BreakpointsEnum } from '../src/responsive/breakpoints';
import { QueryMatcher } from '../src/responsive/query-matcher';
import { ElevationComponentTest } from './elevation.stories.comp';

const classFlex = css`
  display: flex;
`;

storiesOf('Component/Util/QueryMatcher', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('with child render function', () => (
    <QueryMatcher
      mediaQuery={`(min-width: ${number('Min width', breakpoints[BreakpointsEnum.medium1])}px)`}
    >
      {(match: boolean) =>
        match ? (
          <div>Match ! (min-width: 1024px)</div>
        ) : (
          <div>Do not match ! (min-width: 1024px)</div>
        )
      }
    </QueryMatcher>
  ))
  .add('with raw component', () => (
    <QueryMatcher
      ToRender={ElevationComponentTest}
      mediaQuery={`(min-width: ${number('Min width', breakpoints[BreakpointsEnum.medium1])}px)`}
    />
  ));
