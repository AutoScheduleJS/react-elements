import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Dialog, DialogTheme } from '../src/modal/dialog';
import { Modal } from '../src/modal/modal';
import { Scrim, ScrimTheme } from '../src/modal/scrim';
import { ThemeContext } from '../src/util/theme';
import { color, number } from '@storybook/addon-knobs';
import { rGBToHex } from './util';
import { merge } from '../src/util/hoc.util';

const customThemeFn = () =>
  ({
    scrim: {
      color: rGBToHex(color('scrim color', '#000000')),
    },
  } as ScrimTheme);

const customThemeFnDialog = () =>
  merge(
    {
      scrim: {
        color: rGBToHex(color('scrim color', '#000000')),
      },
    } as ScrimTheme,
    {
      dialog: {
        elevation: number('dialog elevation', 24),
        contentMarginTop: number('content margin top', 64),
        width: number('width', 560),
        margin: number('margin', 24),
        titleBaseline: number('Title baseline', 24),
        alertBaseline: number('Alert baseline', 24),
        backgroundColor: color('color', '#FFFFFF'),
      }
    } as DialogTheme
  );

const ScrimUser: React.FunctionComponent<{}> = _ => {
  const [showScrim, setShowScrim] = React.useState(false);

  React.useEffect(() => {
    if (!showScrim) {
      setTimeout(() => setShowScrim(true), 600);
    }
  }, [showScrim]);

  return <Scrim displayScrim={showScrim} handleClick={() => setShowScrim(false)} />;
};

const DialogUser: React.FunctionComponent<{}> = _ => {
  const [showDialog, setShowDialog] = React.useState(true);
  const onClick = () => setShowDialog(false);
  React.useEffect(() => {
    if (!showDialog) {
      setTimeout(() => setShowDialog(true), 600);
    }
  }, [showDialog]);
  return (
    <>
      <Scrim displayScrim={showDialog} />
      {showDialog && (
        <Dialog
          dialogTitle={'Just one question'}
          content={
            <div>
              <p>Is there someone here?</p>
            </div>
          }
          actions={[<button onClick={onClick}>Yes</button>, <button onClick={onClick}>No</button>]}
        />
      )}
    </>
  );
};

storiesOf('Component/Util/Modal', module)
  .add('just modal', () => (
    <>
      <div id="modal-root" />
      <Modal>
        <p>I'm in a modal!</p>
      </Modal>
    </>
  ))
  .add('scrim', () => (
    <ThemeContext.Provider value={customThemeFn()}>
      <ScrimUser />
    </ThemeContext.Provider>
  ))
  .add('simple dialog', () => (
    <>
      <div id="modal-root" />
      <Dialog actions={[<button>Yes</button>, <button>No</button>]} />
    </>
  ))
  .add('dialog with title', () => (
    <>
      <div id="modal-root" />
      <Dialog
        dialogTitle={'Just one question'}
        actions={[<button>Yes</button>, <button>No</button>]}
      />
    </>
  ))
  .add('dialog with content', () => (
    <>
      <div id="modal-root" />
      <Dialog
        content={
          <div>
            <p>Is there someone here?</p>
          </div>
        }
        actions={[<button>Yes</button>, <button>No</button>]}
      />
    </>
  ))
  .add('full dialog with custom theme', () => (
    <ThemeContext.Provider value={customThemeFnDialog()}>
      <DialogUser />
      <div id="modal-root" />
    </ThemeContext.Provider>
  ));
