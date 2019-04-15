import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Modal } from '../src/modal/modal';

storiesOf('Component/Util/Modal', module).add('simple', () => (
  <>
    <div id="modal-root" />
    <Modal>
      <p>I'm in a modal!</p>
    </Modal>
  </>
));
