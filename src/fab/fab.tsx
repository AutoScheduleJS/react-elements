import { css } from 'emotion';
import * as React from 'react';
import { EffectRippleProps } from '../effect-ripple/effect-ripple';
import { ElevationPropsPress } from '../elevation/elevation';
import { Typography } from '../typography/typography';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

export enum FabSize {
  Default,
  Mini,
  Extended,
}

export interface FabProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  size?: FabSize;
  label?: string;
  icon?: React.ReactElement<{}>;
}

type FabPropsExtended = FabProps & React.HTMLAttributes<HTMLDivElement>;

interface FabTheme {
  fab: {
    shape: {
      defaultShape: string;
      miniShape: string;
      extendedShape: string;
    };
    elevation: {
      resting: number;
      pressed: number;
    };
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        palette: {
          primary: {
            main: '#42a5f5',
            on: '#000000',
          },
        },
      },
      theme
    ),
  (theme: any) =>
    merge(
      {
        fab: {
          elevation: {
            resting: 6,
            pressed: 12,
          },
          shape: {
            extendedShape: css`
              border-radius: 24px;
              height: 48px;
              background-color: ${theme.palette.primary.main};
              color: ${theme.palette.primary.on};
            `,
            defaultShape: css`
              border-radius: 28px;
              height: 56px;
              padding: 0 16px;
              background-color: ${theme.palette.primary.main};
              color: ${theme.palette.primary.on};
            `,
            miniShape: css`
              padding: 0 8px;
              border-radius: 20px;
              height: 40px;
              background-color: ${theme.palette.primary.main};
              color: ${theme.palette.primary.on};
            `,
          },
        },
      } as FabTheme,
      theme
    )
);

const FabRootStyles = (theme: FabTheme, size: number, icon: boolean) => {
  const base = css`
    user-select: none;
    display: flex;
    align-items: center;
  `;
  switch (size) {
    case FabSize.Mini:
      return css`
        ${base} ${theme.fab.shape.miniShape};
      `;
    case FabSize.Default:
      return css`
        ${base} ${theme.fab.shape.defaultShape};
      `;
    case FabSize.Extended:
      return css`
        ${base} ${theme.fab.shape.extendedShape};
        padding: 0 20px 0 ${icon ? 12 : 20}px;
      `;
    default:
      return base;
  }
};

const buttonTabCss = css`
  text-align: center;
`;

export const Fab: React.FunctionComponent<FabPropsExtended> = React.forwardRef(
  (props, forwardRef) => {
    const { label, size = FabSize.Default, icon, onClick = () => {}, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const { resting, pressed } = theme.fab.elevation;
    const hostProps = mergeProps(
      ElevationPropsPress(resting, pressed, theme),
      EffectRippleProps(theme),
      {
        className: FabRootStyles(theme, size, !!icon),
        onClick,
      },
      defaultHostProps
    );
    return (
      <div {...hostProps} ref={forwardRef}>
        {icon}
        {label && (
          <Typography scale="Button" className={buttonTabCss}>
            {label}
          </Typography>
        )}
      </div>
    );
  }
);
