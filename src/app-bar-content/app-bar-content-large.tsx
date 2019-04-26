import { css } from 'emotion';
import * as React from 'react';
import { PaddingProps } from '../responsive/padding';
import { Typography } from '../typography/typography';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { ThemeContext, PaletteTheme } from '../util/theme';

export interface AppBarContentProps {
  title?: string;
}

type AppBarContentPropsExtended = AppBarContentProps & React.HTMLAttributes<HTMLDivElement>

export interface AppBarContentTheme {
  appBar: {
    totalHeight: string;
    backgroundColor: string;
    color: string;
  };
}

const defaultTheme = pipe(
    (theme: any) => merge(
      {
        palette: {
          primary: {
            main: '#9c27b0',
            on: '#ffffff'
          }
        }
      } as PaletteTheme,
      theme
    ),
    (theme: any) => merge(
    {
      appBar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.on,
      },
    } as AppBarContentTheme,
    theme
  ));

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
export const AppBarContentLarge: React.FunctionComponent<AppBarContentPropsExtended> = props => {
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
