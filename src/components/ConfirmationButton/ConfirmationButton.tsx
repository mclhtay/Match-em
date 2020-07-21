import * as React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

const ButtonWrapper = styled.button`
  width: ${rem('150px')};
  height: ${rem('50px')};
  background-color: #0080ff;
  border-radius: 5px;
  font-size: ${rem('20px')};
  cursor: pointer;
  border: none;
`;

interface Props {
  onConfirm: () => void;
}

export const ConfirmationButton: React.FC<Props> = ({ onConfirm }: Props) => (
  <ButtonWrapper onClick={onConfirm}>Confirm</ButtonWrapper>
);
