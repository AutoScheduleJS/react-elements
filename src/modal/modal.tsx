import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const Modal: React.FunctionComponent<{}> = props => {
  const child = React.useRef<HTMLDivElement>();
  const [isMounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    child.current = document.createElement('div');
    const modalRoot = document.getElementById('modal-root') as HTMLElement;
    modalRoot.appendChild(child.current);
    setMounted(true);
    return () => {
      modalRoot.removeChild(child.current as HTMLDivElement);
    };
  }, []);

  if (!isMounted || !child.current) {
    return null;
  }
  return ReactDOM.createPortal(props.children, child.current);
};
