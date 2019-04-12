import { css } from 'emotion';
import { ElevationProps, ElevationPropsHover } from '../elevation/elevation';
import { merge, mergeProps, pipe } from '../util/hoc.util';

interface CardTheme {
  card: {
    restElevation: number;
    activeElevation: number;
    color: string;
    backgroundColor: string;
    shape: string;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette: { surface: { main: '#FFF', on: '#00000099' } } }, theme),
  (theme: any) =>
    merge(
      {
        card: {
          restElevation: 1,
          activeElevation: 8,
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.on,
          shape: css`
            border-radius: 4px;
          `,
        },
      } as CardTheme,
      theme
    )
);

const themeToClassname = (theme: CardTheme, isClickable: boolean | undefined) => ({
  className: css`
    background-color: ${theme.card.backgroundColor};
    color: ${theme.card.color};
    user-select: ${isClickable ? 'none' : 'auto'};
    ${theme.card.shape};
  `,
});

/**
 * Maybe this component is useless, hook in ElevationPropsHover depends on isClickable props, so it break a hook's rule.
 * component is too simple.
 */
export const CardProps = (options: { customTheme?: any; isClickable?: boolean }) => {
  const { customTheme, isClickable } = options;
  const theme = defaultTheme(customTheme);
  const card = theme.card;
  const elevation = isClickable
    ?  ElevationPropsHover(
      card.restElevation,
      card.activeElevation,
      theme
    )
    : ElevationProps(card.restElevation, theme)
  return mergeProps(elevation, themeToClassname(theme, isClickable));
};
