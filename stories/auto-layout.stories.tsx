import { storiesOf } from '@storybook/react';
// import { css } from 'emotion';
import * as React from 'react';
import { AutoLayout } from '../src/layout/auto-layout';

// const divClass = () => {
//   const randomHeight = Math.random() * 250 + 50;
//   return css`
//     border: 1px solid green;
//     height: ${randomHeight}px;
//   `;
// };

storiesOf('Component/Util/AutoLayout', module).add('simple', () => (
  <AutoLayout itemWidth={'120px'} />
));
