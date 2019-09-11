import { useObservableCallback, useSubscription } from 'observable-hooks';
import * as React from 'react';
import { Observable, Subscriber } from 'rxjs';
import { FakeInput, TextInput, TextInputProps } from '../text-input/text-input';
import { handleOverride, mergeProps } from '../util/hoc.util';
import { Menu, MenuProps } from './menu';
import { MenuItem, MenuItemProps } from './menu-item';

/**
 * Dropdown menu
 *
 * same behavior as native one
 */

export type dropdownValues = ReadonlyArray<{ readonly key: any; readonly label: string }>;
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
    item?: {
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
  const inputRef = React.useRef(null);

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

  const pos =
    inputRef.current === null
      ? { x: 100, y: 100 }
      : { x: (inputRef.current as any).offsetLeft, y: (inputRef.current as any).offsetTop + 60 };
  const menuItems = React.useMemo(
    () =>
      values.map(obj => {
        const highlighted = obj.key === value;
        const itemProps = {
          onMouseDown: (e: React.MouseEvent) => {
            e.preventDefault();
            setIsActive(false);
            onNewVal(obj.key);
          },
          label: obj.label,
          highlighted
        };
        return handleOverride<MenuItemProps, never>(MenuItem, itemProps)(override && override.item);
      }),
    [values, value]
  );

  const menuProps = mergeProps(
    {
      position: pos,
      items: menuItems,
    },
    defaultHostProps
  );

  const inputCmp = handleOverride<TextInputProps, never>(TextInput, inputProps, inputRef)(
    override && override.input
  );
  const menuCmp = handleOverride<MenuProps, never>(Menu, menuProps)(override && override.menu);

  return (
    <>
      {inputCmp}
      {isActive && menuCmp}
    </>
  );
};

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
