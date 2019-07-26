import { css } from 'emotion';
import * as React from 'react';
import { merge, mergeProps } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  activePage: number;
  pageDisplayed: number;
  beforeComponent: any;
  afterComponent: any;
  stepComponent: any;
}

export interface PaginationTheme {
  pagination: {
  };
}

const defaultTheme = (theme: any): PaginationTheme =>
  merge(
    {
    },
    theme
  );

const AppBarRootStyles = (_theme: PaginationTheme) => ({
  className: css`
  `,
});

/**
 * Pagination:
 * "active": Current Day
 * number of displayed step (eg: `< 4 5 6` => 3)
 * step component
 * before component
 * after component
 */
export const Pagination: React.FunctionComponent<PaginationProps> = props => {
  const { children, ...defaultHostProps } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(
    AppBarRootStyles(theme),
    defaultHostProps
  );
  return <div {...hostProps}>{children}</div>;
};
