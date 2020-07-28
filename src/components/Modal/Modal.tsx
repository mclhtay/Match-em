import * as React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const modalRoot = document.getElementById('modal');

interface Props {
  children: React.ReactNode;
}

const ModalWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal: React.FC<Props> = ({ children }: Props) => {
  const elRef = React.useRef<any>(null);
  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }
  React.useEffect(() => {
    if (modalRoot) {
      modalRoot.appendChild(elRef.current);
      return () => modalRoot.removeChild(elRef.current);
    }
  }, []);

  return createPortal(<ModalWrapper>{children}</ModalWrapper>, elRef.current);
};
