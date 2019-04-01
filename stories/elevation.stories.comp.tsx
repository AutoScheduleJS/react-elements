import * as React from 'react';
import { mergeProps } from '../src/util/hoc.util';
import { ElevationPropsHover } from '../src/elevation/elevation';

export const ElevationComponentTest = (props: any) => {
  return <div {...mergeProps(props, ElevationPropsHover(0, 24))} />;
};
