import { css } from 'emotion';
import { withTheme } from 'emotion-theming';
import * as React from 'react';
import { ElevationProps } from '../elevation/elevation';
import { merge, mergeProps } from '../util/hoc.util';

interface CustomableProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: any;
}

interface AppBarProps extends CustomableProps {}

interface AppBarTheme {
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
        totalHeight: '58px'
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
class AppBarImpl extends React.PureComponent<AppBarProps> {
  render() {
    const {
      children,
      theme: incomingTheme,
      ...defaultHostProps
    } = this.props;
    const theme = defaultTheme(incomingTheme);
    const hostProps = mergeProps(
      ElevationProps(theme.appBar.elevation, theme),
      AppBarRootStyles(theme),
      defaultHostProps
    );
    return <div {...hostProps}>{children}</div>;
  }
}

export const AppBar = withTheme(AppBarImpl);
