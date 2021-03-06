import { css, cx } from 'emotion';
import { merge, pipe } from '../util/hoc.util';
import { palettePrimary, PaletteTheme } from '../util/theme';

export interface EffectRippleTheme {
  effectRiple: {
    color: string;
    duration: number;
    shape: string;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette: { primary: palettePrimary } } as PaletteTheme, theme),
  (theme: any) =>
    merge(
      {
        effectRiple: {
          color: theme.palette.primary.on,
          duration: 600,
          shape: css`
            border-radius: 50%;
          `,
        },
      } as EffectRippleTheme,
      theme
    )
);

const ripple = (e: MouseEvent, theme: EffectRippleTheme) => {
  const duration = theme.effectRiple.duration;
  const rippleColor = theme.effectRiple.color;
  const clickedEl: HTMLElement = e.currentTarget as HTMLElement;
  const btnWidth = clickedEl.clientWidth;
  const el = clickedEl.getBoundingClientRect();
  const rippleX = e.clientX - el.left;
  const rippleY = e.clientY - el.top;

  const baseCSS = cx(
    css`
      position: absolute;
      width: ${btnWidth * 2}px;
      height: ${btnWidth * 2}px;
      transition: transform ${duration}ms, opacity ${duration}ms;
      transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      background-color: ${rippleColor};
      opacity: 0.12;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      left: ${rippleX - btnWidth}px;
      top: ${rippleY - btnWidth}px;
      transform: scale(0);
      pointer-events: none;
    `,
    theme.effectRiple.shape
  );

  const rippleElem = document.createElement('span');
  rippleElem.className = baseCSS;

  // Add some css for prevent overflow errors
  clickedEl.style.overflow = 'hidden';

  // Check if the element is not static because the ripple is in absolute
  if (window.getComputedStyle(clickedEl).position === 'static') {
    clickedEl.style.position = 'relative';
  }

  clickedEl.appendChild(rippleElem);

  // start animation
  setTimeout(() => {
    rippleElem.className = css`
      ${baseCSS} ${css`
        transform: scale(1);
      `};
    `;
  }, 0);

  const onMouseUp = () => {
    rippleElem.className = css`
      ${baseCSS} ${css`
        transform: scale(1);
        opacity: 0;
      `};
    `;
    setTimeout(() => {
      rippleElem.remove();
      removeEventListener('mouseup', onMouseUp);
    }, theme.effectRiple.duration);
  };
  addEventListener('mouseup', onMouseUp);
};

export const EffectRippleProps = (customTheme?: any) => {
  const theme = defaultTheme(customTheme);
  return {
    onMouseDown: (e: MouseEvent) => ripple(e, theme),
  };
};
