import { css } from 'emotion';
import * as React from 'react';
import { ElevationPropsHover } from '../src/elevation/elevation';
import { mergeProps } from '../src/util/hoc.util';

const style = {
  className: css`
    height: 150px;
    width: 150px;
    background-color: grey;
    border-radius: 4px;
  `,
};

export const ElevationComponentTest = (props: any) => {
  return <div {...mergeProps(props, ElevationPropsHover(0, 24), style)} />;
};
