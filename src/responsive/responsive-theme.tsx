import * as React from 'react';
import { ThemeContext } from '../util/theme';

interface ResponsiveThemeProps {
  baseTheme: any;
  rules: Array<{ key: string; query: string }>;
  handleBreakpoint: (theme: any, keys: { [key: string]: boolean }) => any;
}

export const ResponsiveTheme: React.FunctionComponent<ResponsiveThemeProps> = props => {
  const { children } = props;
  const [theme, setTheme] = React.useState(props.baseTheme);
  let enabledRules: { [key: string]: boolean };
  let mqls: Array<{ key: string; mql: MediaQueryList }>;
  let handleMatchChangeFn: (e: any) => void;

  React.useEffect(() => {
    if (!window.matchMedia) {
      return;
    }
    mqls = props.rules.map(rule => ({
      key: rule.key,
      mql: window.matchMedia(rule.query),
    }));
    enabledRules = mqls.reduce((acc, cur) => ({ ...acc, [cur.key]: cur.mql.matches }), {});
    const initialTheme = props.handleBreakpoint(props.baseTheme, enabledRules);
    setTheme(initialTheme);
    handleMatchChangeFn = handleMatchChange(props, enabledRules, setTheme, theme);
    mqls.forEach(mql => mql.mql.addListener(handleMatchChangeFn));

    return () => {
      mqls.forEach(mql => mql.mql.removeListener(handleMatchChangeFn as any));
    };
  }, [props.baseTheme, props.handleBreakpoint, props.rules]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

const handleMatchChange = (
  props: ResponsiveThemeProps,
  enabledRules: { [key: string]: boolean },
  setTheme: React.Dispatch<any>,
  theme: any
) => (e: MediaQueryList) => {
  /**
   *  Warning: if browser aren't unified about e.media formatting, it will not work.
   *  The other way involves building a handleMatchChange function for each rule,
   *  wich is cumbersome if you want to keep function reference for later listener removing.
   *  Seriously, it would be way simpler to keep a subscription ID...
   */
  const rule = props.rules.find(r => r.query === e.media);
  if (!rule) {
    return;
  }
  enabledRules[rule.key] = e.matches;
  setTheme(props.handleBreakpoint(theme, enabledRules));
};
