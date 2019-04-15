import { css } from 'emotion';
import * as React from 'react';
import { mergeAll, mergeProps } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

interface LayoutMasonryProps {
  columnGap?: string;
  rowGap?: string;
  itemWidth: string;
}

type LayoutMasonryPropsExtended = LayoutMasonryProps & React.HTMLAttributes<HTMLDivElement>;

interface LayoutMasonryTheme {
  layout: {
    verticalGutter: string;
    horizontalGutter: string;
  };
}

const defaultTheme = (theme: any, columnGap?: string, rowGap?: string): LayoutMasonryTheme => {
  return mergeAll(
    {
      layout: {
        verticalGutter: '24px',
        horizontalGutter: '24px',
      },
    } as LayoutMasonryTheme,
    theme,
    { layout: { verticalGutter: columnGap, horizontalGutter: rowGap } }
  );
};

const themeToHostProps = (theme: LayoutMasonryTheme, itemWidth: string) => {
  const layout = theme.layout;
  return {
    className: css`
      display: grid;
      grid-column-gap: ${layout.verticalGutter};
      grid-row-gap: ${layout.horizontalGutter};
      grid-template-columns: repeat(auto-fill, minmax(${itemWidth}, 1fr));
      grid-auto-rows: 1px;
    `,
  };
};

const windowMock = {
  addEventListener: () => {},
  removeEventListener: () => {},
  requestAnimationFrame: (fn: () => void) => {
    fn();
  },
};

export const LayoutMasonry: React.FunctionComponent<LayoutMasonryPropsExtended> = props => {
  const { children, columnGap, rowGap, itemWidth, ...defaultHostProps } = props;
  const gridRef: React.MutableRefObject<HTMLDivElement | undefined> = React.useRef();
  const resizeItemsFn = resizeItems(gridRef);
  React.useEffect(() => {
    const myWindow = window || windowMock;
    resizeItemsFn();
    myWindow.addEventListener('resize', resizeItemsFn);
    return () => {
      myWindow.removeEventListener('resize', resizeItemsFn);
    };
  }, [children, columnGap, rowGap]);
  const theme = defaultTheme(React.useContext(ThemeContext), columnGap, rowGap);
  const hostProps = mergeProps(themeToHostProps(theme, itemWidth), defaultHostProps);
  return (
    <div ref={gridRef} {...hostProps}>
      {children}
    </div>
  );
};

const resizeItems = (gridRef: React.MutableRefObject<HTMLDivElement | undefined>) => () => {
  const myWindow = window || windowMock;
  myWindow.requestAnimationFrame(() => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }
    const items = grid.children;
    if (!items) {
      return;
    }
    grid.style.gridAutoRows = 'auto';
    grid.style.alignItems = 'self-start';
    Array.from(items).forEach(item => {
      const span = Math.ceil((item.clientHeight + 24) / 25);
      (item as HTMLDivElement).style.gridRowEnd = `span ${span}`;
    });
    grid.style.gridAutoRows = '';
    grid.style.alignItems = '';
  });
};
