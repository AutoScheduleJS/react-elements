import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Fab, FabSize } from '../src/fab/fab';
import { css } from 'emotion';

const logClick = (e: any) => console.log('clicked', e);

const fabClass = css`
  position: absolute;
  left: 16px;
  top: 16px;
`;

storiesOf('Component/Material/FAB', module)
  .add('Low emphaze', () => <Fab className={fabClass} onClick={logClick} size={FabSize.Mini}  label={'Low Button'} />)
  .add('Medium emphaze', () => <Fab className={fabClass} onClick={logClick} size={FabSize.Default} label={'Medium Button'} />)
  .add('High emphaze', () => <Fab className={fabClass} onClick={logClick} size={FabSize.Extended} label={'High Button'} />);
