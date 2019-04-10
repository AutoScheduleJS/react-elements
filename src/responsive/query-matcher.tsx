import * as React from 'react';

interface QueryMatcherProps {
  mediaQuery: string;
  defaultMatch?: boolean;
  children?: (v: boolean) => React.ReactNode;
  ToRender?: React.ComponentType<any>;
  [key: string]: any;
}

export const QueryMatcher: React.FunctionComponent<QueryMatcherProps> = props => {
  const [matches, setMatches] = React.useState(!!props.defaultMatch);
  const { children, ToRender, ...otherProps } = props;

  let mql: MediaQueryList;
  let handleMatchChangeFn: (a: any) => void;

  React.useEffect(() => {
    if (!window.matchMedia && matches !== props.defaultMatch) {
      setMatches(!!props.defaultMatch);
      return;
    }
    mql = window.matchMedia(props.mediaQuery);
    setMatches(mql.matches);
    handleMatchChangeFn = handleMatchChange(setMatches);
    mql.addListener(handleMatchChangeFn);
    return () => {
      mql.removeListener(handleMatchChangeFn);
    }
  }, [props.mediaQuery, props.defaultMatch]);

  if (children) {
    return children(matches) as any;
  }
  if (ToRender && matches) {
    delete otherProps.defaultMatch;
    delete otherProps.mediaQuery;
    return <ToRender {...otherProps} />;
  }
  return null;
}

const handleMatchChange = (setMatches: React.Dispatch<boolean>) => (e: MediaQueryList) => {
  setMatches(e.matches);
}
