import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Dropdown } from '../src/menu/menu';

// const DropdownHostWithCreate: React.FunctionComponent<{}> = _ => {
//   const [value, setValue] = React.useState('simple');
//   const [values, setValues] = React.useState([
//     { key: 'simple', label: 'Simple Val' },
//     { key: 'a', label: 'Value A' },
//     { key: 'b', label: 'Value B' },
//     { key: 'c', label: 'Value C' },
//   ]);
//   return (
//     <DropdownMenuWithCreate
//       onNewVal={val => setValue(val)}
//       labelForCreation={input => `+ ${input}`}
//       label={'my dropdown'}
//       value={value}
//       values={values}
//       onCreateVal={val => setValues([...values, { key: val, label: val }])}
//     />
//   );
// };

const DropdownHostSimple: React.FunctionComponent<{}> = _ => {
  const [value, setValue] = React.useState('simple');
  const values = [
    { key: 'simple', label: 'Simple Val' },
    { key: 'a', label: 'Value A' },
    { key: 'b', label: 'Value B' },
    { key: 'c', label: 'Value C' },
  ];
  return (
    <Dropdown onNewVal={val => setValue(val)} label={'my dropdown'} value={value} values={values} />
  );
};

storiesOf('Component/Material/DropdownMenu', module)
  // .add('with create option', () => (
  //   <>
  //     <div id="modal-root" />
  //     <DropdownHostWithCreate />
  //   </>
  // ))
  .add('Simple', () => (
    <>
      <div id="modal-root" />
      <DropdownHostSimple />
    </>
  ));
