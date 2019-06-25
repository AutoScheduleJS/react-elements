import { css } from 'emotion';
import * as React from 'react';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

interface IRange {
  start: number;
  end: number;
}

type timeItem = IRange & { key: string | number };

export type timeItems<T extends timeItem> = Array<T | T[]>;

export interface IItemProps<T extends IRange> {
  item: T;
  isLast?: boolean;
}

interface TimelineProps<T extends timeItem> {
  range: IRange;
  items: timeItems<T>;
  ItemCmp: React.ComponentType<IItemProps<T>>;
}

interface TimelineWithLineTheme {
  timeline: {
    height: string;
    lineColor: string;
  };
}

const defaultThemeWithLine = pipe(
  (theme: any) =>
    merge(
      {
        palette: {
          primary: {
            main: '#000',
          },
        },
      },
      theme
    ),
  (theme: any): TimelineWithLineTheme =>
    merge(
      {
        timeline: {
          height: '72px',
          lineColor: theme.palette.primary.main,
        },
      } as TimelineWithLineTheme,
      theme
    )
);

const percentToHexString = (percent: number) => {
  const decimal = Math.round(255 * percent);
  const suffix = decimal < 17 ? '0' : '';
  return suffix + decimal.toString(16);
};

const themeToHostStyles = (theme: TimelineWithLineTheme) => {
  const t = theme.timeline;

  return {
    className: css`
      height: ${t.height};
      position: relative;
    `,
  };
};

const lineStyle = (theme: TimelineWithLineTheme, opacityRange: IRange) => {
  const t = theme.timeline;
  const gradientOpaque = t.lineColor + 'FF';
  const maskStart = '#FFFFFF' + percentToHexString(opacityRange.start);
  const maskEnd = '#FFFFFF' + percentToHexString(opacityRange.end);
  return css`
    position: absolute;
    left: 0;
    right: 0;
    top: 47%;
    bottom: 47%;
    z-index: -1;
    border-radius: 3px;
    background: linear-gradient(to right, ${maskStart} 0%, ${maskEnd} 100%), ${gradientOpaque};
  `;
};

/**
 * Simple timeline: display components on a timeline. Width is proportional to their duration
 */
export const TimelineWithLine = <T extends timeItem>(
  props: TimelineProps<T> & React.HTMLAttributes<HTMLDivElement> & { opacityRange: IRange }
) => {
  const { range, items, ItemCmp, opacityRange, ...defaultHostProps } = props;
  const theme = defaultThemeWithLine(React.useContext(ThemeContext));
  const timeItemCmps = itemsArrayToCmp<T>(computeHorizontalStyleItem(range), items, ItemCmp);
  const hostProps = mergeProps(defaultHostProps, themeToHostStyles(theme));
  return (
    <div {...hostProps}>
      {timeItemCmps}
      <div className={lineStyle(theme, opacityRange)} />
    </div>
  );
};

const itemsArrayToCmp = <T extends timeItem>(
  computePosition: (item: IRange) => string,
  items: timeItems<T>,
  ItemCmp: React.ComponentType<IItemProps<T>>
): any => {
  return items.map(item => {
    if (Array.isArray(item)) {
      return itemsArrayToCmp(computePosition, item, ItemCmp);
    }
    const hostProps = { item, className: computePosition(item) };
    return <ItemCmp key={item.key} {...hostProps} />;
  });
};

const computeHorizontalStyleItem = (range: IRange ) => pipe(computePosAndDim(range), posAndDimHorizontalStyle);

const computePosAndDim = (range: IRange) => (item: IRange) => {
  const totalAmount = range.end - range.start;
  const itemAmount = item.end - item.start;
  const sinceStart = item.start - range.start;
  const pos = (100 * sinceStart) / totalAmount;
  const dim = (100 * itemAmount) / totalAmount;
  return { pos, dim }
}

type posAndDim = {
  pos: number;
  dim: number;
};

const posAndDimHorizontalStyle = ({pos, dim}: posAndDim) => css`
  left: ${pos + '%'};
  top: 0px;
  width: ${dim + '%'};
  position: absolute;
`;