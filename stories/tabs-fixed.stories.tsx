import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { TabsFixed, TabsFixedPlacement, TabsFixedSimple } from '../src/tabs-fixed/tabs-fixed';

const TabsTester: React.FunctionComponent<{ placement: TabsFixedPlacement }> = props => {
  const [activeTab, setActiveTab] = React.useState('1');
  const tabs = [
    { label: 'Tab A', id: '1' },
    { label: 'Tab B', id: '2' },
    { label: 'Tab C', id: '3' },
  ];
  return (
    <TabsFixed
      placement={props.placement}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={id => setActiveTab(id)}
    >
      <div>Tab A</div>
      <div>Tab B</div>
      <div>Tab C</div>
    </TabsFixed>
  );
};

const TabsTesterSimple: React.FunctionComponent<{}> = _ => {
  const tabs = [
    { label: 'Tab A', id: '1' },
    { label: 'Tab B', id: '2' },
    { label: 'Tab C', id: '3' },
  ];
  return (
    <TabsFixedSimple placement={TabsFixedPlacement.Centered} tabs={tabs}>
      <div>Tab A</div>
      <div>Tab B</div>
      <div>Tab C</div>
    </TabsFixedSimple>
  );
};

storiesOf('Component/Material/TabsFixed', module)
  .add('Centered', () => <TabsTester placement={TabsFixedPlacement.Centered} />)
  .add('FullWidth', () => <TabsTester placement={TabsFixedPlacement.FullWidth} />)
  .add('LeftAligned', () => <TabsTester placement={TabsFixedPlacement.LeftAligned} />)
  .add('RightAligned', () => <TabsTester placement={TabsFixedPlacement.RightAligned} />)
  .add('Simple Tab', () => <TabsTesterSimple />);
