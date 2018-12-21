import { cx } from 'emotion';

const _pipe = (a: any, b: any) => (...args: any[]) => b(a(...args));

export const pipe = (...ops: any[]) => ops.reduce(_pipe);

export const safeProp = <T extends any>(path: string[], defaultVal: T) => (val: any): T => {
  try {
    return path.reduce((prev, cur) => prev[cur], val);
  } catch (_error) {
    return defaultVal;
  }
}

export const isObject = (obj: any) => {
  return typeof obj === 'object' && obj !== null;
};

export const isFunction = (fn: any) => {
  return typeof fn === 'function';
};

/**
 * oldObj: { a: { b: 1, e: 8 }}
 * newObj: { a: { c: 2, e: undefined }}
 * result: { a: { b: 1, c: 2, e: 8 }}
 */
export const merge = (oldObj: any, newObj: any) => {
  if (!isObject(oldObj) || !isObject(newObj)) {
    if (isFunction(oldObj) && isFunction(newObj)) {
      return (...arg: any[]) => {
        oldObj(...arg);
        newObj(...arg);
      };
    }
    return newObj === undefined ? oldObj : newObj;
  }
  const result = { ...newObj, ...oldObj };
  Object.keys(oldObj).forEach(key => {
    if (newObj.hasOwnProperty(key)) {
      result[key] = merge(oldObj[key], newObj[key]);
    }
  });
  return result;
};

export const mergeAll = (...objs: any[]) => {
  return objs.reduce((acc, cur) => merge(acc, cur));
};

export const prepareProps = (oProps: any) => {
  const { className } = oProps;
  const props: any = Object.assign({}, oProps);
  delete props.className; // workaround for TS issue 'spread object of generic type'
  return { className, props };
};

/**
 * merge className with css
 * merge function with root function
 * merge objects with merge
 */
export const mergeProps = (...props: any[]) => {
  const result = props.reduce(merge);
  result.className = cx(
    ...props.filter(prop => prop && prop.className).map(prop => prop.className)
  );
  return result;
};