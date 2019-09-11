import { css } from 'emotion';
import * as React from 'react';
import { EffectRippleProps } from '../effect-ripple/effect-ripple';
import { ElevationProps } from '../elevation/elevation';
import { TypographyProps } from '../typography/typography';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { paletteSecondary, paletteSurface, PaletteTheme, ThemeContext } from '../util/theme';

export enum ButtonEmphaze {
  Low,
  Medium,
  High,
}

export interface ButtonProps {
  emphaze: ButtonEmphaze;
  label?: string;
  icon?: React.Component;
}

type ButtonPropsExtended = ButtonProps & React.HTMLAttributes<HTMLDivElement>;

export interface ButtonTheme {
  button: {
    shape: string;
    mediumShape: string;
    lowShape: string;
    highShape: string;
    elevation: number;
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        palette: {
          secondary: paletteSecondary,
          surface: paletteSurface,
        },
      } as PaletteTheme,
      theme
    ),
  (theme: any) =>
    merge(
      {
        button: {
          elevation: 2,
          shape: css`
            border-radius: 4px;
            padding: 0 16px;
            height: 36px;
            min-width: 64px;
            color: ${theme.palette.secondary.main};
          `,
          highShape: css`
            color: ${theme.palette.secondary.on};
            background-color: ${theme.palette.secondary.main};
          `,
          mediumShape: css`
            color: ${theme.palette.surface.on};
            border: 1px solid ${theme.palette.surface.on};
          `,
          lowShape: css`
            padding: 0 8px;
          `,
        },
      },
      theme
    )
);

/**
 * Caution: prettier will add an indesirable space between baselineColor & opacity
 */
const ButtonRootStyles = (theme: ButtonTheme, emphaze: number) => {
  const base = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    text-align: center;
    ${theme.button.shape};
  `;
  switch (emphaze) {
    case ButtonEmphaze.Low:
      return css`
        ${base} ${theme.button.lowShape};
      `;
    case ButtonEmphaze.Medium:
      return css`
        ${base} ${theme.button.mediumShape};
      `;
    case ButtonEmphaze.High:
      return css`
        ${base} ${theme.button.highShape};
      `;
    default:
      return base;
  }
};

export const Button: React.FunctionComponent<ButtonPropsExtended> = React.forwardRef(
  (props: ButtonPropsExtended, forwardedRef) => {
    const { label, emphaze, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const elevation = emphaze === ButtonEmphaze.High ? theme.button.elevation : 0;
    const hostProps = mergeProps(
      ElevationProps(elevation, theme),
      TypographyProps({ scale: 'Button' }),
      EffectRippleProps(theme),
      { className: ButtonRootStyles(theme, emphaze) },
      defaultHostProps
    );
    return (
      <div ref={forwardedRef} {...hostProps}>
        {label}
      </div>
    );
  }
);

export const TappableProps = (theme?: any) => mergeProps(EffectRippleProps(theme));
