import { createContext} from 'react';

export const ThemeContext = createContext({});

export interface PaletteColor {
  main: string,
  lightVariant: string,
  darkVariant: string,
  on: string,
}

export const palettePrimary: PaletteColor = {
  main: '#9d10b5',
  on: '#ffffff',
  darkVariant: '#610a70',
  lightVariant: '#ce71de'
};

export const paletteSecondary: PaletteColor = {
  main: '#a5bf1f',
  on: '#000000',
  darkVariant: '#596909',
  lightVariant: '#ccde71',
};

export interface PaletteSurface {
  main: string;
  on: string;
  background: string;
  baseEmphase: string;
  highEmphase: string;
  mediumEmphase: string;
  disabled: string;
};

export const paletteSurface: PaletteSurface = {
  main: '#424242',
  background: '#232321',
  on: '#FFFFFF',
  baseEmphase: '#FFFFFF',
  highEmphase: 'DD',
  mediumEmphase: '99',
  disabled: '61',
}

export const palette: PaletteTheme['palette'] = {
  primary: palettePrimary,
  secondary: paletteSecondary,
  surface: paletteSurface,
}

export interface PaletteTheme {
  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    surface: PaletteSurface;
  }
}