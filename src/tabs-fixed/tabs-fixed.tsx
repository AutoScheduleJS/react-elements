import { css } from 'emotion';
import * as React from 'react';
import { animated, useTransition } from 'react-spring/web';
import { Button, ButtonEmphaze } from '../button/button';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

export enum TabsFixedPlacement {
  FullWidth,
  Centered,
  LeftAligned,
  RightAligned,
}

export interface TabInfo {
  icon?: React.Component;
  label?: string;
  id: string;
}

export interface TabsFixedProps {
  placement: TabsFixedPlacement;
  activeTab: string;
  tabs: TabInfo[];
  onTabChange: (id: string, event: React.MouseEvent<HTMLDivElement>) => void;
}

type TabsFixedPropsExtended = TabsFixedProps & React.HTMLAttributes<HTMLDivElement>;

interface TabsFixedTheme {
  tabs: {
    totalHeight: string;
    backgroundColor: string;
    colorActive: string;
    colorInactive: string;
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        palette: {
          secondary: {
            main: '#c62828',
          },
          surface: {
            main: '#FFFFFF',
            on: '#C2C2C2',
          },
        },
      },
      theme
    ),
  (theme: any) =>
    merge(
      {
        tabs: {
          totalHeight: '48px',
          backgroundColor: theme.palette.surface.main,
          colorActive: theme.palette.secondary.main,
          colorInactive: theme.palette.surface.on,
        },
      } as TabsFixedTheme,
      theme
    )
);

const placementToJustify = (placement: TabsFixedPlacement) => {
  switch (placement) {
    case TabsFixedPlacement.Centered:
      return 'justify-content: center';
    case TabsFixedPlacement.FullWidth:
      return 'justify-content: stretch';
    case TabsFixedPlacement.LeftAligned:
      return 'justify-content: flex-start';
    case TabsFixedPlacement.RightAligned:
      return 'justify-content: flex-end';
  }
};

const containerCss = (placement: TabsFixedPlacement) => css`
  display: flex;
  ${placementToJustify(placement)};
`;

const tabsCss = css`
  display: inline-grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
`;

const classButton = (theme: TabsFixedTheme, isActive: boolean) => css`
  box-sizing: content-box;
  background-color: ${theme.tabs.backgroundColor};
  border-bottom: ${isActive ? `2px solid ${theme.tabs.colorActive}` : 'none'};
  border-radius: 0;
  grid-row: 1;
  padding: 0 16px;
  color: ${isActive ? theme.tabs.colorActive : theme.tabs.colorInactive};
  height: ${theme.tabs.totalHeight};
`;

const baseContentStyle = {
  width: '100%',
  position: 'absolute' as 'absolute',
};

const rootClass = css`
  position: relative;
  overflow: hidden;
`;

export const TabsFixed: React.FunctionComponent<TabsFixedPropsExtended> = React.forwardRef(
  (props: TabsFixedPropsExtended, forwardRef) => {
    const { activeTab, children, onTabChange, tabs, placement, ...defaultHostProps } = props;

    const [myActiveI, setActiveI] = React.useState(0);
    const [myActiveTab, setActiveTab] = React.useState('');
    const [backward, setBackward] = React.useState<boolean>();

    if (myActiveTab !== activeTab) {
      const activeI = props.tabs.findIndex(tab => tab.id === props.activeTab);
      const previousI = props.tabs.findIndex(tab => tab.id === activeTab);

      setActiveI(activeI);
      setActiveTab(props.activeTab);
      setBackward(previousI === -1 ? undefined : previousI > myActiveI);
    }

    if (!tabs.length) {
      return null;
    }
    const transitions = useTransition(
      React.Children.toArray(children)[myActiveI],
      () => myActiveI,
      {
        from: {
          transform: `translate3d(${backward === undefined ? 0 : backward ? -100 : 100}%,0,0)`,
        },
        enter: { transform: 'translate3d(0%,0,0)' },
        leave: { transform: `translate3d(${backward ? 100 : -100}%,0,0)` },
      }
    );

    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(
      {
        className: rootClass,
      },
      defaultHostProps
    );
    console.log('activeI', myActiveI);
    return (
      <div {...hostProps} ref={forwardRef}>
        <div className={containerCss(placement)}>
          <div className={tabsCss}>
            {tabs.map(tab => (
              <Button
                emphaze={ButtonEmphaze.Low}
                key={tab.id}
                label={tab.label}
                icon={tab.icon}
                onClick={e => onTabChange(tab.id, e)}
                className={classButton(theme, tab.id === activeTab)}
              />
            ))}
          </div>
        </div>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={{ ...baseContentStyle, ...props }}>
            {item}
          </animated.div>
        ))}
      </div>
    );
  }
);
