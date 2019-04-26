import { css } from 'emotion';
import * as React from 'react';
import { animated, useTransition } from 'react-spring/web';
import { merge, pipe } from '../util/hoc.util';
import { ThemeContext, PaletteTheme } from '../util/theme';

export interface ScrimProps {
  displayScrim: boolean;
  handleClick?: () => void;
}

export interface ScrimTheme {
  scrim: {
    color: string;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette: { surface: { on: '#000000' } } } as PaletteTheme, theme),
  (theme: any) =>
    merge(
      {
        scrim: {
          color: theme.palette.surface.on + '51',
        },
      } as ScrimTheme,
      theme
    )
);

const themeToScrimClass = (theme: ScrimTheme) => css`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${theme.scrim.color};
`;

export const Scrim: React.FunctionComponent<ScrimProps> = props => {
  const { displayScrim, handleClick } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const transition = useTransition(displayScrim, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return transition.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          className={themeToScrimClass(theme)}
          onClick={handleClick}
          style={props}
        />
      )
  ) as any;
};
