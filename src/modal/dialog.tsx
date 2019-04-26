import { css } from 'emotion';
import * as React from 'react';
import { ElevationProps } from '../elevation/elevation';
import { Typography } from '../typography/typography';
import { merge, mergeProps, pipe } from '../util/hoc.util';
import { Modal } from './modal';
import { ThemeContext } from '../util/theme';

export interface DialogProps {
  dialogTitle?: string;
  content?: React.ReactNode;
  actions: Array<React.ReactNode>;
}

type DialogPropsExtended = DialogProps & React.HTMLAttributes<HTMLDivElement>;

export interface DialogTheme {
  dialog: {
    elevation: number;
    contentMarginTop: number;
    width: number;
    shape: string;
    margin: number;
    titleBaseline: number;
    alertBaseline: number;
    backgroundColor: string;
  };
}

const defaultTheme = pipe(
  (theme: any) =>
    merge(
      {
        palette: { surface: { main: '#FFFFFF' } },
      },
      theme
    ),
  (theme: any) =>
    merge(
      {
        dialog: {
          elevation: 24,
          contentMarginTop: 64,
          width: 560,
          shape: css`
            border-radius: 8px;
          `,
          margin: 24,
          titleBaseline: 40,
          alertBaseline: 38,
          backgroundColor: theme.palette.surface.main,
        },
      } as DialogTheme,
      theme
    )
);
const DialogRootClass = (theme: DialogTheme) => {
  const dialog = theme.dialog;
  return {
    className: css`
      position: fixed;
      top: 45%;
      left: calc(50% - ${theme.dialog.width / 2}px);
      width: ${theme.dialog.width}px;
      padding-left: ${theme.dialog.margin}px;
      padding-right: 8px;
      padding-bottom: 8px;
      background-color: ${dialog.backgroundColor};
      ${dialog.shape};
    `,
  };
};

const actionClassname = css`
  display: flex;
  justify-content: flex-end;
`;

export const Dialog: React.FunctionComponent<DialogPropsExtended> = React.forwardRef(
  (props: DialogPropsExtended, forwardedRef) => {
    const { dialogTitle, content, actions, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(
      ElevationProps(theme.dialog.elevation, theme),
      DialogRootClass(theme),
      defaultHostProps
    );
    const titleElem = dialogTitle ? (
      <Typography scale={'H6'} baselineTop={theme.dialog.titleBaseline}>
        {dialogTitle}
      </Typography>
    ) : null;
    return (
      <Modal>
        <div ref={forwardedRef} {...hostProps}>
          {titleElem}
          <div>{content}</div>
          <div className={actionClassname}>{actions}</div>
        </div>
      </Modal>
    );
  }
);
