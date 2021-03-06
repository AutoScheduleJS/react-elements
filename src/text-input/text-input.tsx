import { css } from 'emotion';
import * as React from 'react';
import { TypographyProps } from '../typography/typography';
import { handleOverride, merge, mergeProps, pipe } from '../util/hoc.util';
import { paletteSecondary, paletteSurface, PaletteTheme, ThemeContext } from '../util/theme';

export enum LabelType {
  float,
  fixed,
  hidden,
}

export enum TextInputStatus {
  enabled,
  disabled,
  error,
}

export interface TextInputProps {
  label: string;
  value: string;
  onNewVal: (val: string) => void;
  labelType?: LabelType;
  status?: TextInputStatus;
  assistiveMsg?: string;
  leadingIcon?: React.Component;
  trailingIcon?: React.Component;
  override?: {
    input?: {
      Component?: React.ComponentType<any>;
      props?: any;
    };
  };
}

type TextInputPropsExtended = TextInputProps & React.HTMLAttributes<HTMLDivElement>;

export interface TextInputStateTheme {
  inactive: string;
  activated: string;
  hover: string;
  disabled: string;
  error: string;
}

export interface TextInputTheme {
  textInput: {
    size: number;
    baseContainer: string;
    baseLabel: string;
    baseIndicator: string;
    container: TextInputStateTheme;
    label: TextInputStateTheme;
    indicator: TextInputStateTheme;
    input: string;
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
        textInput: {
          baseContainer: css`
            height: 56px;
            min-width: 280px;
            border-radius: 4px 4px 0 0;
            background-color: ${theme.palette.surface.baseEmphase + '0b'};
          `,
          baseLabel: css`
            color: ${theme.palette.surface.baseEmphase + theme.palette.surface.mediumEmphase};
          `,
          baseIndicator: css`
            position: absolute;
            bottom: -2px;
            height: 2px;
            left: 0;
            right: 0;
            transform-origin: center;
            transition: transform 0.25s, color 0.25s, height 0.25s;
            background-color: ${theme.palette.secondary.main};
            transform: scale(0, 0);
          `,
        },
      },
      theme
    ),
  (theme: any) =>
    merge(
      {
        textInput: {
          container: {
            inactive: theme.textInput.baseContainer,
            activated: theme.textInput.baseContainer,
            hover: css`
              ${theme.textInput.baseContainer};
              background-color: ${theme.palette.surface.baseEmphase + '14'};
              border-bottom: 1px solid ${theme.palette.surface.baseEmphase + '32'};
            `,
            disabled: theme.textInput.baseContainer,
            error: theme.textInput.baseContainer,
          },
          label: {
            inactive: theme.textInput.baseLabel,
            activated: css`
              ${theme.textInput.baseLabel};
              color: ${theme.palette.secondary.main};
            `,
            hover: theme.textInput.baseLabel,
            disabled: css`
              ${theme.textInput.baseLabel};
              color: ${theme.palette.surface.baseEmphase + theme.palette.surface.disabled};
            `,
          },
          indicator: {
            inactive: theme.textInput.baseIndicator,
            activated: css`
              ${theme.textInput.baseIndicator};
              transform: scale(1, 1);
            `,
            hover: theme.textInput.baseIndicator,
            disabled: theme.textInput.baseIndicator,
            error: css`
              ${theme.textInput.baseIndicator};
              transform: scale(1, 1);
              color: 'red';
            `,
          },
        },
      } as TextInputTheme,
      theme
    )
);

const TextInputRootClass = (theme: TextInputTheme) => {
  const base = css`
    position: relative;
    ${theme.textInput.container.inactive};
    &:hover {
      ${theme.textInput.container.hover};
    }
  `;
  return { className: base };
};

const LabelClass = (
  theme: TextInputTheme,
  labelType: LabelType,
  value: string,
  status: TextInputStatus,
  isActive: boolean
) => {
  const label = theme.textInput.label;
  const base = isActive
    ? label.activated
    : status === TextInputStatus.disabled
    ? label.disabled
    : status === TextInputStatus.enabled
    ? label.inactive
    : label.error;
  const floating = css`
    padding-left: 12px;
    transition: font-size 0.25s, transform 0.25s, color 0.25s;
    ${base};
  `;
  const placeHolder = css`
    padding-left: 12px;
    transition: font-size 0.25s, transform 0.25s, color 0.25s;
    transform: translate(0, 14px);
    font-size: 16px;
    ${base};
  `;
  if (labelType === LabelType.fixed) {
    return { className: floating };
  }
  if (labelType === LabelType.hidden) {
    if (value || isActive) {
      return {
        className: css`
          display: none;
        `,
      };
    }
    return { className: placeHolder };
  }
  if (value || isActive) {
    return { className: floating };
  }
  return {
    className: placeHolder,
  };
};

const InputClass = (_theme: TextInputTheme) => {
  const base = css`
    box-sizing: border-box;
    background-clip: padding-box;
    background: none;
    border: 0;
    outline: 0;
    padding: 0;
    position: absolute;
    bottom: 12px;
    right: 12px;
    left: 12px;
  `;
  return { className: base };
};

const ActiveIndicatorClass = (
  theme: TextInputTheme,
  status: TextInputStatus,
  isActive: boolean
) => {
  const indic = theme.textInput.indicator;
  const indicClass =
    status === TextInputStatus.error ? indic.error : isActive ? indic.activated : indic.inactive;
  return { className: indicClass };
};

interface FakeInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
}

export const FakeInput: React.FunctionComponent<FakeInputProps> = React.forwardRef<
  HTMLDivElement,
  FakeInputProps
>((props: FakeInputProps, forwardRef) => {
  const hostProps = mergeProps(
    {
      className: css`
        user-select: none;
      `,
    },
    props
  );
  return (
    <div ref={forwardRef} tabIndex={0} {...hostProps}>
      {props.value}
    </div>
  );
});

export const RealInput: React.FunctionComponent<
  React.HTMLAttributes<HTMLInputElement>
> = React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLInputElement>>(
  (props: React.HTMLAttributes<HTMLInputElement>, forwardRef) => {
    return <input {...props} ref={forwardRef} />;
  }
);

export const TextInput: React.FunctionComponent<TextInputPropsExtended> = React.forwardRef(
  (props: TextInputPropsExtended, forwardedRef) => {
    const [isActive, setActive] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>();
    React.useEffect(() => {
      if (!isActive || !inputRef.current) {
        return;
      }
      inputRef.current.focus();
    }, [isActive]);
    const {
      label,
      value,
      onNewVal,
      labelType = LabelType.float,
      status = TextInputStatus.enabled,
      assistiveMsg,
      leadingIcon,
      trailingIcon,
      override,
      ...defaultHostProps
    } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(
      TextInputRootClass(theme),
      {
        onClick: () => setActive(true),
        onFocus: () => setActive(true),
        onBlur: () => setActive(false),
      },
      defaultHostProps
    );
    const labelProps = mergeProps(
      TypographyProps({ scale: 'Caption', baselineTop: 20 }),
      LabelClass(theme, labelType, value, status, isActive)
    );
    const inputProps = mergeProps(TypographyProps({ scale: 'Subtitle1' }), InputClass(theme), {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => onNewVal(e.target.value),
    });
    const itemCmp = handleOverride(RealInput, inputProps, inputRef)(override && override.input);
    const activIndicatorProps = ActiveIndicatorClass(theme, status, isActive);
    return (
      <div ref={forwardedRef} {...hostProps}>
        <div {...labelProps}>{label}</div>
        {itemCmp}
        <div {...activIndicatorProps} />
      </div>
    );
  }
);

export const TextInputFocus: React.FunctionComponent<TextInputPropsExtended> = React.forwardRef(
  (props: TextInputPropsExtended, forwardedRef) => {
    const { value, onNewVal, ...defaultHostProps } = props;
    const [inputVal, setInputVal] = React.useState(value);
    React.useEffect(() => setInputVal(value), [value]);
    const inputOnNewVal = React.useCallback(e => setInputVal(e), []);
    const hostProps = mergeProps(defaultHostProps, { onBlur: () => onNewVal(inputVal) });
    return (
      <TextInput ref={forwardedRef} {...hostProps} value={inputVal} onNewVal={inputOnNewVal} />
    );
  }
);
