import { css } from 'emotion';
import * as React from 'react';
import { TextInput, TextInputProps } from '../text-input/text-input';
import { mergeProps } from '../util/hoc.util';
import { dropdownValues } from './dropdown';

/**
 * no text input -> on mobile, user should select without the keyboard popup
 * last value in dropdown is for creation? Yes on desktop, no on mobile
 * When a value is already here, move it to the top of the list + highlight it
 */
export interface SelectCreateProps {
  readonly label: string;
  readonly value: any;
  readonly onSelectVal: (v: any) => void;
  readonly onNewVal: (v: string) => void;
  readonly values: dropdownValues;
}

type SelectCreatePropsExtended = SelectCreateProps & React.HTMLAttributes<HTMLDivElement>;

export const SelectCreate: React.FunctionComponent<SelectCreatePropsExtended> = React.forwardRef<
  HTMLDivElement,
  SelectCreatePropsExtended
>((props: SelectCreatePropsExtended, forwardedRef) => {
  const { label, onNewVal, onSelectVal, value, values, ...defaultHostProps } = props;
  const [inputVal, setInputVal] = React.useState('');
  // const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(
    // { className: rootStyles(theme) },
    defaultHostProps
  );

  const items = React.useMemo(() => {
    const inputFormated = inputVal.toLowerCase().trim();
    const subSet = values.filter(val => val.label.toLowerCase().includes(inputFormated));
    const activeI = subSet.findIndex(val => val.key === value);
    if (activeI !== -1) {
      const active = subSet.splice(activeI, 1)[0];
      subSet.unshift(active);
    }
    const elems = subSet.map(item => {
      const itemProps = {
        label: item.label,
        onClick: () => onSelectVal(item.key),
      };
      return <SelectCreateItem key={item.key} {...itemProps} />;
    });
    if (inputFormated !== '' && !subSet.some(val => val.label.toLowerCase() === inputFormated)) {
      const itemCreateProps = {
        label: `Create ${inputVal}`,
        onClick: () => onNewVal(inputVal),
      };
      elems.push(<SelectCreateItem key={'item-create'} {...itemCreateProps} />);
    }
    return elems;
  }, [value, values, inputVal]);

  const inputProps: TextInputProps = {
    label,
    value: inputVal,
    onNewVal: setInputVal,
  };

  return (
    <div {...hostProps} ref={forwardedRef}>
      <TextInput {...inputProps} />
      <div>{items}</div>
    </div>
  );
});

export interface SelectCreateItemProps {
  readonly label: string;
}

type SelectCreateItemPropsExtended = SelectCreateItemProps & React.HTMLAttributes<HTMLDivElement>;

export const SelectCreateItem: React.FunctionComponent<SelectCreateItemPropsExtended> = props => {
  const { label, ...defaultHostProps } = props;
  const hostProps = mergeProps(
    {
      className: css`
        height: 32px;
      `,
    },
    defaultHostProps
  );
  return <div {...hostProps}>{label}</div>;
};
