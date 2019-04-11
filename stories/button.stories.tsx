import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Button, ButtonEmphaze } from '../src/button/button';
import { ThemeContext } from '../src/util/theme';

const customTheme = () => ({
  button: {
    elevation: number('elevation', 2)
  },
});

storiesOf('Component/Material/Button', module)
  .add('Low emphaze', () => <Button emphaze={ButtonEmphaze.Low} label={'Low Button'} />)
  .add('Medium emphaze', () => <Button emphaze={ButtonEmphaze.Medium} label={'Medium Button'} />)
  .add('High emphaze', () => <Button emphaze={ButtonEmphaze.High} label={'High Button'} />)
  .add('Custom theme', () =>
  <ThemeContext.Provider value={customTheme()}>
    <Button emphaze={ButtonEmphaze.High} label={'High Button'} />
  </ThemeContext.Provider>
  )
