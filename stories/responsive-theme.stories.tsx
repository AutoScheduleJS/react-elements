import { color } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { breakpoints, BreakpointsEnum } from '../src/responsive/breakpoints';
import { ResponsiveTheme } from '../src/responsive/responsive-theme';
import { Typography } from '../src/typography/typography';
import { merge } from '../src/util/hoc.util';
import { rGBToHex } from './util';

const breakKeyToNewTheme =  (_: any, keys: { [key: string]: boolean }): any => {
  if (keys['' + BreakpointsEnum.small2]) {
    return {
      palette: { surface: { on: rGBToHex(color('small2 color', '#235974')) } },
    };
  }
  if (keys['' + BreakpointsEnum.medium1]) {
    return {
      palette: { surface: { on: rGBToHex(color('between small2 & medium1 color', '#653218')) } },
    };
  }
  return {
    palette: { surface: { on: rGBToHex(color('greater than medium1 color', '#032450')) } },
  };
};

const handleBreakpoints = () => (theme: any, keys: { [key: string]: boolean }) => {
  return merge(theme, breakKeyToNewTheme(theme, keys));
};

const rules = [
  {
    key: '' + BreakpointsEnum.small2,
    query: `(max-width: ${breakpoints[BreakpointsEnum.small2]}px)`,
  },
  {
    key: '' + BreakpointsEnum.medium1,
    query: `(max-width: ${breakpoints[BreakpointsEnum.medium1]}px)`,
  },
];

const customTheme = () => ({
  palette: { surface: { on: rGBToHex(color('base color', '#546325')) } },
});

storiesOf('Component/Util/ResponsiveTheme', module).add('two rules', () => (
  <ResponsiveTheme baseTheme={customTheme()} rules={rules} handleBreakpoint={handleBreakpoints()}>
    <Typography scale={'H3'}>Subarashi Responsive Theme</Typography>
  </ResponsiveTheme>
));
