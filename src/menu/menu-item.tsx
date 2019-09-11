import { css } from 'emotion';
import * as React from 'react';
import { TypographyProps } from '../typography/typography';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { palettePrimary, paletteSurface, PaletteTheme, ThemeContext } from '../util/theme';

export interface MenuItemTheme {
  menuItem: {
    height: string;
    shape: string;
    highlightColor: string;
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        palette: {
          primary: palettePrimary,
          surface: paletteSurface,
        },
      } as PaletteTheme,
      theme
    ),
  (theme: any) =>
    merge(
      {
        menuItem: {
          height: '32px',
          shape: css`
            padding: 0 8px 0 16px;
          `,
          highlightColor: theme.palette.primary.main + theme.palette.surface.mediumEmphase,
        },
      } as MenuItemTheme,
      theme
    )
);

const MenuItemRootClass = (theme: MenuItemTheme, highlighted: boolean) => {
  const hostTheme = theme.menuItem;
  return {
    className: css`
      height: ${hostTheme.height};
      background-color: ${highlighted ? hostTheme.highlightColor : 'unset'};
      ${hostTheme.shape};
    `,
  };
};

export interface MenuItemProps {
  readonly label: string;
  readonly highlighted: boolean;
}

type MenuItemPropsExtended = MenuItemProps & React.HTMLAttributes<HTMLDivElement>;

export const MenuItem: React.FunctionComponent<MenuItemPropsExtended> = props => {
  const { label, highlighted, ...defaultHostProps } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(
    MenuItemRootClass(theme, highlighted),
    TypographyProps({ scale: 'Body1' }),
    defaultHostProps
  );
  return <div {...hostProps}>{label}</div>;
};
