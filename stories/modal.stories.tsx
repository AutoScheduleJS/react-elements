import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Modal } from '../src/modal/modal';
import { Scrim, ScrimTheme } from '../src/modal/scrim';
import { ThemeContext } from '../src/util/theme';
import { color } from '@storybook/addon-knobs';
import { rGBToHex } from './util';

const customThemeFn = () => ({
  scrim: {
    color: rGBToHex(color('color', '#000000'))
  }
} as ScrimTheme);

const ScrimUser: React.FunctionComponent<{}> = _ => {
  const [showScrim, setShowScrim] = React.useState(false);

  React.useEffect(() => {
    if (!showScrim) {
      setTimeout(() => setShowScrim(true), 600);
    }
  }, [showScrim]);

  return <Scrim displayScrim={showScrim} handleClick={() => setShowScrim(false)} />
}

storiesOf('Component/Util/Modal', module).add('simple', () => (
  <>
    <div id="modal-root" />
    <Modal>
      <p>I'm in a modal!</p>
    </Modal>
  </>
)).add('scrim',() =>
<ThemeContext.Provider value={customThemeFn()}>
  <ScrimUser />
</ThemeContext.Provider>);
