import * as React from 'react';
import { render } from 'react-testing-library';
import { TypographyProps } from './typography';

describe('Typography props', () => {
  test('with only mandatory props', async () => {
    const props = TypographyProps({ scale: 'H1' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'H1'");
  });

  test('with all props', async () => {
    const props = TypographyProps({
      scale: 'H1',
      emphase: 'high',
      baselineTop: 10,
      baselineBottom: 15,
    });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot(
      "scale: 'H1', emphase: 'high', baselineTop: 10, baselineBottom: 15"
    );
  });

  test('with medium emphase', async () => {
    const props = TypographyProps({ scale: 'H1', emphase: 'medium' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'H1', emphase: 'medium'");
  });

  test('with low emphase', async () => {
    const props = TypographyProps({ scale: 'H1', emphase: 'low' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'H1', emphase: 'low'");
  });

  test('with H2 scale', async () => {
    const props = TypographyProps({ scale: 'H2' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'H2'");
  });

  test('with H3 scale', async () => {
    const props = TypographyProps({ scale: 'H3' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'H3'");
  });

  test('with H4 scale', async () => {
    const props = TypographyProps({ scale: 'H4' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'H4'");
  });

  test('with H5 scale', async () => {
    const props = TypographyProps({ scale: 'H5' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'H5'");
  });

  test('with H6 scale', async () => {
    const props = TypographyProps({ scale: 'H6' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'H6'");
  });

  test('with Body1 scale', async () => {
    const props = TypographyProps({ scale: 'Body1' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'Body1'");
  });

  test('with Body2 scale', async () => {
    const props = TypographyProps({ scale: 'Body2' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'Body2'");
  });

  test('with Button scale', async () => {
    const props = TypographyProps({ scale: 'Button' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'Button'");
  });

  test('with Caption scale', async () => {
    const props = TypographyProps({ scale: 'Caption' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'Caption'");
  });

  test('with Overline scale', async () => {
    const props = TypographyProps({ scale: 'Overline' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'Overline'");
  });

  test('with Subtitle1 scale', async () => {
    const props = TypographyProps({ scale: 'Subtitle1' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'Subtitle1'");
  });

  test('with Subtitle2 scale', async () => {
    const props = TypographyProps({ scale: 'Subtitle2' });
    const { baseElement } = render(<div {...props}>test</div>);
    expect(baseElement).toMatchSnapshot("scale: 'Subtitle2'");
  });
});
