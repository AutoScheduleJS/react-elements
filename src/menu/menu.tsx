import { css } from 'emotion';
import * as React from 'react';
import { CardProps } from '../card/card';
import { Modal } from '../modal/modal';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { ThemeContext } from '../util/theme';

export interface MenuProps {
  position: { x: number; y: number };
  items: any[];
}

interface MenuTheme {
  menu: {
    roundCorner: number;
    minWidth: number;
    shape: string;
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        menu: {
          roundCorner: 4,
          minWidth: 112,
          shape: css`
            padding: 8px 0;
          `
        },
      },
      theme
    ) as MenuTheme
);

const MenuClassRoot = (position: { x: number; y: number }, theme: MenuTheme) => ({
  className: css`
    position: absolute;
    top: ${position.y}px;
    left: ${position.x}px;
    border-radius: ${theme.menu.roundCorner}px;
    min-width: ${theme.menu.minWidth}px;
    overflow-y: hidden;
    ${theme.menu.shape};
  `,
});

export const Menu: React.FunctionComponent<
  MenuProps & React.HTMLAttributes<HTMLDivElement>
> = props => {
  const { position, items, ...defaultHostProps } = props;
  const theme: MenuTheme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(
    CardProps({ customTheme: theme }),
    MenuClassRoot(position, theme),
    defaultHostProps
  );
  return (
    <Modal>
      <div tabIndex={0} {...hostProps}>
        {items}
      </div>
    </Modal>
  );
};
