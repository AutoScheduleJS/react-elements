import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import {
  LabelType,
  TextInput,
  TextInputFocus,
  TextInputStatus,
} from '../src/text-input/text-input';
import { ThemeContext } from '../src/util/theme';

const customTheme = () => ({
  textInput: {
    size: number('size', 9),
    baseContainer: css`
      height: 56px;
      min-width: 280px;
      border-radius: 4px 4px 0 0;
      background-color: #165db2;
    `,
    baseLabel: css`
      color: #567425;
    `,
    baseIndicator: css`
      position: absolute;
      bottom: -2px;
      height: 2px;
      left: 0;
      right: 0;
      transform-origin: center;
      transition: transform 0.25s, color 0.25s, height 0.25s;
      background-color: #964dd1;
      transform: scale(0, 0);
    `,
  },
});

const DumpTextInput: React.FunctionComponent<{ label: string; [key: string]: any }> = props => {
  const { label, ...otherProps } = props;
  const [val, setVal] = React.useState('');
  return <TextInput label={label} value={val} onNewVal={v => setVal(v)} {...otherProps} />;
};

const DumpTextInputFocus: React.FunctionComponent<{
  label: string;
  [key: string]: any;
}> = props => {
  const { label, ...otherProps } = props;
  const [val, setVal] = React.useState('');
  const onNewVal = (v: string) => setVal(v.toUpperCase());
  return <TextInputFocus label={label} value={val} onNewVal={onNewVal} {...otherProps} />;
};

storiesOf('Component/Material/TextInput', module)
  .add('default textInput', () => <DumpTextInput label={'Default textInput'} />)
  .add('label fixed', () => <DumpTextInput label={'Fixed Label'} labelType={LabelType.fixed} />)
  .add('label hidden', () => <DumpTextInput label={'Hidden Label'} labelType={LabelType.hidden} />)
  .add('disabled textInput', () => (
    <DumpTextInput label={'Disabled textInput'} status={TextInputStatus.disabled} />
  ))
  .add('error textInput', () => (
    <DumpTextInput label={'Disabled textInput'} status={TextInputStatus.error} />
  ))
  .add('on blur', () => <DumpTextInputFocus label={'updated on blur'} />)
  .add('Custom theme', () => (
    <ThemeContext.Provider value={customTheme()}>
      <DumpTextInput label={'My Input'} />
    </ThemeContext.Provider>
  ));
