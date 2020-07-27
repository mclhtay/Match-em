import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';
import { Characters } from 'src/store/reducers/user';

interface Props {
  characters: Characters;
}

const ModalContentWrapper = styled.div`
  height: 50%;
  width: 50%;
  color: white;
  font-size: 100px;
`;

export const StorageModal: React.FC<Props> = ({ characters }: Props) => (
  <Modal>
    <ModalContentWrapper>hi</ModalContentWrapper>
  </Modal>
);
