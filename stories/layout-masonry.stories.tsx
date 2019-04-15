import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import { LayoutMasonry } from '../src/layout-masonry/layout-masonry';

const divClass = () => {
  const randomHeight = Math.random() * 250 + 50;
  return css`
    border: 1px solid green;
    height: ${randomHeight}px;
  `;
};

const generateDiv = () =>
  Array.from(Array(35), (_, x) => <div className={divClass()}>Test n°{x}</div>);

storiesOf('Component/Util/LayoutMasonry', module)
  .add('simple', () => <LayoutMasonry itemWidth={'120px'}>{generateDiv()}</LayoutMasonry>)
  .add('empty width', () => <LayoutMasonry rowGap={'21px'} columnGap={'14px'} itemWidth={'120px'}>{generateDiv()}</LayoutMasonry>);
