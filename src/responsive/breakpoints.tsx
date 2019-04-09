export enum BreakpointsEnum {
  xsmall1,
  xsmall2,
  xsmall3,
  xsmall4,
  small1,
  small2,
  small3,
  small4,
  medium1,
  medium2,
  large1,
  large2,
  xlarge,
}

export const breakpoints = {
  [BreakpointsEnum.xsmall1]: 0,
  [BreakpointsEnum.xsmall2]: 360,
  [BreakpointsEnum.xsmall3]: 400,
  [BreakpointsEnum.xsmall4]: 490,
  [BreakpointsEnum.small1]: 600,
  [BreakpointsEnum.small2]: 720,
  [BreakpointsEnum.small3]: 840,
  [BreakpointsEnum.small4]: 960,
  [BreakpointsEnum.medium1]: 1024,
  [BreakpointsEnum.medium2]: 1280,
  [BreakpointsEnum.large1]: 1440,
  [BreakpointsEnum.large2]: 1600,
  [BreakpointsEnum.xlarge]: 1920,
};