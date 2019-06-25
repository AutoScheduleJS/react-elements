
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { TimelineWithLine } from '../src/timeline/timeline';

const today = Date.now();
const oneDay = today + 24 * 3600000;

const ItemComponent: React.FunctionComponent<{ item: any }> = props => {
  const { item, ...otherProps } = props;
  return <div {...otherProps}>{item.name}</div>
}

const DumpTimeline: React.FunctionComponent<{}> = props => {
  const { ...otherProps } = props;
  return <TimelineWithLine {...otherProps} range={{ start: today, end: oneDay }} items={[
    { start: today, end: today + 3600000, key: 1, name: 'One' }, { start: today + 3600000, end: today + 3600000 * 2, key: 2, name: 'Two' },
  ]} ItemCmp={ItemComponent} opacityRange={{ start: 0.2, end: 0.8 }} />
};

storiesOf('Component/Chart/Timeline', module)
  .add('default textInput', () => <DumpTimeline />);
