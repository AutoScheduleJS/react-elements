import { css } from 'emotion';
import * as React from 'react';
import { mergeAll, mergeProps, useWindowDimensions } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

export interface AutoLayoutProps {
  readonly components: ReadonlyArray<{

  }>
}

type AutoLayoutPropsExtended = AutoLayoutProps & React.HTMLAttributes<HTMLDivElement>;

export interface AutoLayoutTheme {
  layout: {
    verticalGutter: string;
    horizontalGutter: string;
  };
}

const defaultTheme = (theme: any, columnGap?: string, rowGap?: string): AutoLayoutTheme => {
  return mergeAll(
    {
      layout: {
        verticalGutter: '24px',
        horizontalGutter: '24px',
      },
    } as AutoLayoutTheme,
    theme,
    { layout: { verticalGutter: columnGap, horizontalGutter: rowGap } }
  );
};

const themeToHostProps = (_theme: AutoLayoutTheme) => {
  // const layout = theme.layout;
  return {
    className: css``,
  };
};

// const windowMock = {
//   addEventListener: () => {},
//   removeEventListener: () => {},
//   requestAnimationFrame: (fn: () => void) => {
//     fn();
//   },
// };

const computeGridSize = (height: number, width: number) => {
  const heightDivSize = height < 256 * 2 ? height : height / Math.floor(height / 128);
  const widthDivSize = width < 256 * 2 ? width : width / Math.floor(width / 256);
  return {
    heightDivSize,
    widthDivSize,
    heightDivNb: height / heightDivSize,
    widthDivNb: width / widthDivSize
  };
};

/**
 * grid of 128 px (height) x 256 px (width)
 * depends on screen size: divizing in 128px if it results on 3 or less block of 128px isn't interesting, because the minimal height of a main component is: 256px. minimal width is 256px.
 * first & last row should goal 256px height
 */
export const AutoLayout: React.FunctionComponent<AutoLayoutPropsExtended> = props => {
  const { ...defaultHostProps } = props;
  const { height, width } = useWindowDimensions();
  const gridSizes = React.useMemo(() => computeGridSize(height, width), [height, width]);
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(themeToHostProps(theme), defaultHostProps);
  return <div {...hostProps}>test</div>;
};
