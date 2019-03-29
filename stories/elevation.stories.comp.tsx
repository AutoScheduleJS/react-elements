import * as React from 'react';
import { mergeProps } from '../src/util/hoc.util';
import { ElevationPropsHover } from '../src/elevation/elevation';

export const ElevationComponentTest = (props: any) => {
  const [state, setState] = React.useState(0);
  return <div {...mergeProps(props, ElevationPropsHover({ state, setState }, 0, 24))} />;
};
