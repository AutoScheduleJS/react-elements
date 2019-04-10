import { boolean, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { css } from 'emotion';
import * as React from 'react';
import { Typography, TypographyCase, TypographyProps } from '../src/typography/typography';
import { mergeProps } from '../src/util/hoc.util';
import { ThemeContext } from '../src/util/theme';

const classFlex = css`
  display: flex;
`;

const customTheme = () => ({
  typography: {
    H3: {
      weight: 300,
      size: `${number('Size', 10)}px`,
      case: boolean('All case ?', true) ? TypographyCase.AllCase : TypographyCase.Sentence,
      LetterSpacing: `${number('Letter spacing', 0)}px`,
      typeface: text('Typeface', "'Times New Roman', Times, serif"),
    },
  },
});

storiesOf('Props/Typography', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('Custom theme H3', () => (
    <p {...mergeProps(TypographyProps({ scale: 'H3', emphase: 'high', theme: customTheme() }))}>
      Subarashi paragraph
    </p>
  ));

storiesOf('Component/Material/Typography', module)
  .addDecorator(story => <div className={classFlex}>{story()}</div>)
  .add('default title', () => <Typography scale={'H3'}>Subarashi Typo</Typography>)
  .add('default body1 with emphase', () => (
    <Typography emphase={'high'} scale={'Body1'}>
      Subarashi Typo
    </Typography>
  ))
  .add('default with baseline top', () => (
    <Typography baselineTop={50} scale={'Body1'}>
      Subarashi Typo
    </Typography>
  ))
  .add('default with baseline bottom', () => (
    <Typography baselineBottom={50} scale={'Body1'}>
      Subarashi Typo
    </Typography>
  ))
  .add('title with custom theme', () => (
    <ThemeContext.Provider value={customTheme()}>
      <Typography scale={'H3'}>Subarashi Typo</Typography>
    </ThemeContext.Provider>
  ));
