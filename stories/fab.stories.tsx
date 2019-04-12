import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Fab, FabSize } from '../src/fab/fab';

const logClick = (e: any) => console.log('clicked', e);

storiesOf('Component/Material/FAB', module)
  .add('Low emphaze', () => <Fab onClick={logClick} size={FabSize.Mini}  label={'Low Button'} />)
  .add('Medium emphaze', () => <Fab onClick={logClick} size={FabSize.Default} label={'Medium Button'} />)
  .add('High emphaze', () => <Fab onClick={logClick} size={FabSize.Extended} label={'High Button'} />);
