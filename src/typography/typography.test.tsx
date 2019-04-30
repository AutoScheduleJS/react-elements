import { TypographyProps } from './typography';
import * as React from 'react';
import { render } from 'react-testing-library';

test('typography props', async () => {
  const props = TypographyProps({ scale: 'H1', emphase: 'high' });
  const { baseElement } = render(<div {...props}>test</div>);
  expect(baseElement).toMatchSnapshot('<typography props>')
});