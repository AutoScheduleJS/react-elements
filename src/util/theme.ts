import { createContext} from 'react';

export const ThemeContext = createContext({});

export interface PaletteColor {
  main: string,
  lightVariant: string,
  darkVariant: string,
  on: string,
}
export interface PaletteTheme {
  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    surface: {
      main: string;
      on: string;
      background: string;
      baseEmphase: string;
      highEmphase: string,
      mediumEmphase: string,
      disabled: string,
    }
  }
}