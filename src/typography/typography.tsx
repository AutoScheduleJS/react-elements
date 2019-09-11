import { css } from 'emotion';
import * as React from 'react';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { paletteSurface, PaletteTheme, ThemeContext } from '../util/theme';

export interface TypographyProps {
  scale: keyof TypographyScale;
  emphase?: 'high' | 'medium' | 'low';
  baselineTop?: number;
  baselineBottom?: number;
}

type TypographyPropsExtended = React.HTMLAttributes<HTMLDivElement> & TypographyProps;

export enum TypographyCase {
  Sentence,
  AllCase,
}

interface TypographyAttribte {
  typeface: string;
  weight: 300 | 400 | 500;
  size: string;
  case: TypographyCase;
  LetterSpacing: string;
}

interface TypographyScale {
  H1: TypographyAttribte;
  H2: TypographyAttribte;
  H3: TypographyAttribte;
  H4: TypographyAttribte;
  H5: TypographyAttribte;
  H6: TypographyAttribte;
  Subtitle1: TypographyAttribte;
  Subtitle2: TypographyAttribte;
  Body1: TypographyAttribte;
  Body2: TypographyAttribte;
  Button: TypographyAttribte;
  Caption: TypographyAttribte;
  Overline: TypographyAttribte;
}

export interface TypographyThemeColor {
  base: string;
  high: string;
  medium: string;
  low: string;
}

export interface TypographyTheme {
  typeface: {
    baseTypeface: string;
    titleTypeface: string;
  };
  typography: TypographyScale;
  color: TypographyThemeColor;
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        typeface: {
          baseTypeface: 'Verdana, Geneva, sans-serif',
          titleTypeface: "'Times New Roman', Times, serif",
        },
        palette: {
          surface: paletteSurface,
        },
      } as PaletteTheme & TypographyTheme,
      theme
    ),
  (theme: any): TypographyTheme => {
    const base = {
      typeface: theme.typeface.baseTypeface,
      weight: 400,
      case: TypographyCase.Sentence,
    };
    const title = { ...base, typeface: theme.typeface.titleTypeface };
    return merge(
      {
        typography: {
          H1: { ...title, weight: 300, size: '6rem', LetterSpacing: '-0.09375rem' },
          H2: { ...title, weight: 300, size: '3.75rem', LetterSpacing: '-0.03125rem' },
          H3: { ...title, size: '3rem', LetterSpacing: '0rem' },
          H4: { ...title, size: '2.125rem', LetterSpacing: '0.015625rem' },
          H5: { ...title, size: '1.5rem', LetterSpacing: '0rem' },
          H6: { ...title, weight: 500, size: '1.25rem', LetterSpacing: '0.009375rem' },
          Subtitle1: { ...base, size: '1rem', LetterSpacing: '0.009375rem' },
          Subtitle2: { ...base, weight: 500, size: '0.875rem', LetterSpacing: '0.00625rem' },
          Body1: { ...base, size: '1rem', LetterSpacing: '0.03125rem' },
          Body2: { ...base, size: '0.875rem', LetterSpacing: '0.015625rem' },
          Button: {
            ...base,
            case: TypographyCase.AllCase,
            weight: 500,
            size: '0.875rem',
            LetterSpacing: '0.046875rem',
          },
          Caption: { ...base, size: '0.75rem', LetterSpacing: '0.025rem' },
          Overline: {
            ...base,
            case: TypographyCase.AllCase,
            size: '0.625rem',
            LetterSpacing: '0.09375rem',
          },
        } as TypographyScale,
        color: {
          base: theme.palette.surface.on,
          high: theme.palette.surface.highEmphase,
          medium: theme.palette.surface.mediumEmphase,
          low: theme.palette.surface.disabled,
        },
      } as TypographyTheme,
      theme
    );
  }
);

const baselineStrut = (distance: number | undefined) => `
  display: inline-block; width: 0; content: ''; height: ${distance}px
`;

const typeScale = (
  theme: TypographyTheme,
  scale: keyof TypographyScale,
  baselineTop = 0,
  emphase: keyof TypographyThemeColor = 'high',
  baselineBottom?: number
): string => {
  const attr = theme.typography[scale];
  const bottomPos =
    baselineBottom === undefined
      ? ''
      : `
    position: absolute;
    bottom: ${baselineBottom}px;
  `;
  const color = `${theme.color.base}${theme.color[emphase]}`;
  return css`
    color: ${color};
    font-family: ${attr.typeface};
    font-weight: ${attr.weight};
    text-transform: ${attr.case === TypographyCase.Sentence ? 'initial' : 'uppercase'};
    letter-spacing: ${attr.LetterSpacing};
    font-size: ${attr.size};
    margin-bottom: ${-1 * (baselineBottom || 0)};
    &::before {
      ${baselineStrut(baselineTop)};
      vertical-align: 0;
    }
    &::after {
      ${baselineStrut(baselineBottom)};
      vertical-align: ${-1 * (baselineBottom || 0)};
    }
    ${bottomPos};
  `;
};

export const Typography: React.FunctionComponent<TypographyPropsExtended> = props => {
  const { children, scale, baselineTop, baselineBottom, emphase, ...defaultHostProps } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(
    { className: typeScale(theme, scale, baselineTop, emphase, baselineBottom) },
    defaultHostProps
  );
  return <div {...hostProps}>{children}</div>;
};

export const TypographyProps = (options: TypographyProps & { theme?: any }) => {
  const { theme: incomingTheme, scale, baselineTop, emphase, baselineBottom } = options;
  const theme = defaultTheme(incomingTheme);
  return { className: typeScale(theme, scale, baselineTop, emphase, baselineBottom) };
};
