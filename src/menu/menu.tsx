import { css } from 'emotion';
import { useObservableCallback, useSubscription } from 'observable-hooks';
import * as React from 'react';
import { Observable, Subscriber } from 'rxjs';
import { CardProps } from '../card/card';
import { Modal } from '../modal/modal';
import { FakeInput, TextInput } from '../text-input/text-input';
import { handleOverride, merge, mergeProps, pipe } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

/**
 * Dropdown menu
 * DM with search bar filtering result
 * DM with search bar & create if it doesn't exist
 *
 */

type dropdownValues = ReadonlyArray<{ readonly key: any; readonly label: string }>;
export interface DropdownProps {
  readonly label: string;
  readonly value: any;
  readonly onNewVal: (v: any) => void;
  readonly values: dropdownValues;
  readonly override?: {
    input?: {
      Component?: React.ComponentType<any>;
      props?: any;
    };
    menu?: {
      Component?: React.ComponentType<any>;
      props?: any;
    };
  };
}

export const Dropdown: React.FunctionComponent<
  DropdownProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { onNewVal, values, value, override, ...defaultHostProps } = props;
  const [isActive, setIsActive] = React.useState<false | string>(false);
  const [filteredItems, setFilteredItems] = React.useState<dropdownValues>(values);
  const inputRef = React.useRef(null);
  const subCompProps = {
    value,
    onNewVal,
    isActive,
    setIsActive,
  };
  const inputProps = mergeProps({ ...subCompProps, values, setFilteredItems }, defaultHostProps);
  const menuProps = { ...subCompProps, values: filteredItems, inputRef };

  const inputCmp = handleOverride<DropdownInputProps, never>(DropdownInput, inputProps, inputRef)(
    override && override.input
  );
  const menuCmp = handleOverride(DropdownMenu, menuProps)(override && override.menu);

  return (
    <>
      {inputCmp}
      {menuCmp}
    </>
  );
};

export interface DropdownInputProps {
  readonly values: dropdownValues;
  readonly value: any;
  readonly isActive: false | string;
  readonly setIsActive: React.Dispatch<React.SetStateAction<false | string>>;
  readonly setFilteredItems: React.Dispatch<React.SetStateAction<dropdownValues>>;
  readonly onNewVal: (v: any) => void;
}
type dropdownInputExtended = DropdownInputProps & React.HTMLAttributes<HTMLDivElement>;

export const DropdownInput: React.FunctionComponent<dropdownInputExtended> = React.forwardRef(
  (props: dropdownInputExtended, forwardRef) => {
    const {
      isActive,
      setIsActive,
      value,
      values,
      onNewVal,
      setFilteredItems,
      ...defaultHostProps
    } = props;
    const label = React.useMemo(() => {
      const valueObj = values.find(val => val.key === value);
      return valueObj ? valueObj.label : value;
    }, [value]);

    const [keyCallback, keyPressed$] = useObservableCallback<string[], string>(key$ =>
      key$.pipe(aggregateOverTime(1200))
    );
    useSubscription(keyPressed$, keys => simpleDropdownSearch(values, value, onNewVal)(keys));

    const inputProps = mergeProps(
      {
        onClick: () => {
          if (!isActive) {
            setIsActive('click');
          } else if (isActive !== 'focus') {
            setIsActive(false);
          }
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Escape') {
            return setIsActive(false);
          }
          if (e.key === 'Tab' && isActive) {
            e.preventDefault();
            return setIsActive(false);
          }
          if (e.key === 'Enter') {
            return setIsActive(isActive ? false : 'enter');
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const activeIndex = filterValuesFromKey(values, value);
            return activeIndex === 0 ? null : onNewVal(values[activeIndex - 1].key);
          }
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            const activeIndex = filterValuesFromKey(values, value);
            return activeIndex === values.length - 1 ? null : onNewVal(values[activeIndex + 1].key);
          }
          if (e.key.length === 1) {
            return keyCallback(e.key);
          }
        },
        onNewVal: () => {},
        value: label,
        override: {
          input: {
            Component: FakeInput,
          },
        },
      },
      defaultHostProps
    );
    return <TextInput {...inputProps} ref={forwardRef} />;
  }
);

const simpleDropdownSearch = (
  curValues: dropdownValues,
  curValue: any,
  onNewVal: (v: any) => void
) => (keys: string[]): void => {
  const filterCaseInsens = (argKeys: string[]) => (val: { label: string }) =>
    val.label.toLowerCase().startsWith(argKeys.join('').toLowerCase());

  let filteredValues = curValues.filter(filterCaseInsens(keys));

  if (filteredValues.length) {
    return onNewVal(filteredValues[0].key);
  }
  if (!keys.every(v => v === keys[0])) {
    return;
  }
  // user type the same letter multiple times
  filteredValues = curValues.filter(filterCaseInsens([keys[0]]));
  if (!filteredValues.length) {
    return;
  }

  let activeIndex = filteredValues.findIndex(val => val.key === curValue);
  if (activeIndex === filteredValues.length - 1) {
    activeIndex = -1; // cycle
  }
  onNewVal(filteredValues[activeIndex + 1].key);
};

const filterValuesFromKey = (values: dropdownValues, value: any) =>
  values.findIndex(val => val.key === value);

const aggregateOverTime = <T, _>(time: number) => (source: Observable<T>) =>
  Observable.create((subscriber: Subscriber<T[]>) => {
    const values: T[] = [];
    let timeoutId: number;
    return source.subscribe(
      value => {
        clearTimeout(timeoutId);
        values.push(value);
        subscriber.next(values);
        timeoutId = setTimeout(() => values.splice(0), time);
      },
      err => subscriber.error(err),
      () => subscriber.complete()
    );
  });

export interface DropdownMenuProps {
  readonly inputRef: React.MutableRefObject<null>;
  readonly values: dropdownValues;
  readonly isActive: false | string;
  readonly setIsActive: React.Dispatch<React.SetStateAction<false | string>>;
  readonly onNewVal: (v: any) => void;
}

const itemClass = css`
  height: 32px;
`;

export const DropdownMenu: React.FunctionComponent<
  DropdownMenuProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { inputRef, values, isActive, setIsActive, onNewVal, ...defaultHostProps } = props;
  const pos =
    inputRef.current === null
      ? { x: 100, y: 100 }
      : { x: (inputRef.current as any).offsetLeft, y: (inputRef.current as any).offsetTop + 60 };
  const roleItems = React.useMemo(
    () =>
      values.map(obj => (
        <div
          onMouseDown={(e: React.MouseEvent) => {
            e.preventDefault();
            setIsActive(false);
            onNewVal(obj.key);
          }}
          className={itemClass}
        >
          {obj.label}
        </div>
      )),
    [values]
  );
  const menuProps = mergeProps(
    {
      position: pos,
      items: roleItems,
    },
    defaultHostProps
  );
  return <>{isActive && <Menu {...menuProps} />}</>;
};

export interface MenuProps {
  position: { x: number; y: number };
  items: any[];
}

const menuClass = (position: { x: number; y: number }, theme: MenuTheme) => ({
  className: css`
    position: absolute;
    top: ${position.y}px;
    left: ${position.x}px;
    padding: ${theme.menu.paddingTop}px ${theme.menu.paddingRight}px ${theme.menu.paddingBottom}px
      ${theme.menu.paddingLeft}px;
    border-radius: ${theme.menu.roundCorner}px;
    min-width: ${theme.menu.minWidth}px;
  `,
});

interface MenuTheme {
  menu: {
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    roundCorner: number;
    minWidth: number;
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        menu: {
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 8,
          paddingBottom: 8,
          roundCorner: 4,
          minWidth: 112,
        },
      },
      theme
    ) as MenuTheme
);

export const Menu: React.FunctionComponent<
  MenuProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { position, items, ...defaultHostProps } = props;
  const theme: MenuTheme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(
    CardProps({ customTheme: theme }),
    menuClass(position, theme),
    defaultHostProps
  );
  return (
    <Modal>
      <div tabIndex={0} {...hostProps}>
        {items}
      </div>
    </Modal>
  );
};
