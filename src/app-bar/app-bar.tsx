import { css } from 'emotion';
import * as React from 'react';
import { ElevationProps } from '../elevation/elevation';
import { merge, mergeProps } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

interface AppBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface AppBarTheme {
  appBar: {
    elevation: number;
    totalHeight: string;
  };
}

const defaultTheme = (theme: any): AppBarTheme =>
  merge(
    {
      appBar: {
        elevation: 4,
        totalHeight: '58px',
      },
    },
    theme
  );

const AppBarRootStyles = (theme: AppBarTheme) => ({
  className: css`
    height: ${theme.appBar.totalHeight};
  `,
});

/**
 * AppBar container. Not responsible for hiding/reveal upon scroll (should be another component -> when tabs & app-bar are unified, this behavior should be)
 */
export const AppBar: React.FunctionComponent<AppBarProps> = props => {
  const { children, ...defaultHostProps } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(
    ElevationProps(theme.appBar.elevation, theme),
    AppBarRootStyles(theme),
    defaultHostProps
  );
  return <div {...hostProps}>{children}</div>;
};
