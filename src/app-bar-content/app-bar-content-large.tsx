import { css } from 'emotion';
import * as React from 'react';
import { PaddingProps } from '../responsive/padding';
import { Typography } from '../typography/typography';
import { merge, mergeProps } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

interface AppBarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

interface AppBarContentTheme {
  appBar: {
    totalHeight: string;
    backgroundColor: string;
    color: string;
  };
}

const defaultTheme = (theme: any): AppBarContentTheme =>
  merge(
    {
      appBar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.on,
      },
    } as AppBarContentTheme,
    theme
  );

const AppBarContentRootStyles = (theme: AppBarContentTheme) => {
  const appBar = theme.appBar;
  return {
    className: css`
      position: relative;
      display: flex;
      justify-content: center;
      height: ${appBar.totalHeight};
      background-color: ${appBar.backgroundColor};
      color: ${appBar.color};
    `,
  };
};

/**
 * Follow https://material.io/design/components/app-bars-top.html#specs guide
 *
 * navigation icon (optional)
 *
 * title (optional)
 *
 * action button <- specify if it can / have to / can't overflow
 *
 * all default specs are in theme and can be customised by user
 *
 */
export const AppBarContentLarge: React.FunctionComponent<AppBarContentProps> = props => {
  const { title = '', ...defaultHostProps } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(
    PaddingProps(theme),
    AppBarContentRootStyles(theme),
    defaultHostProps
  );
  return (
    <div {...hostProps}>
      <Typography scale={'H1'}>{title}</Typography>
    </div>
  );
};