import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';
import { components } from '../../assets/components';
import { rem } from 'polished';

interface Props {
  hasWon: boolean;
  score?: number;
  onConfirm: () => void;
  onCancel?: () => void;
}

const Wrapper = styled.div`
  height: auto;
  width: 70%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${rem('50px')};
  text-transform: capitalize;
`;

const Inner = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  max-height: 20%;
  max-width: 20%;
  font-size: ${rem('50px')};
`;

const ButtonWrapper = styled.div``;

const Cancel = styled.button.attrs({ type: 'button' })`
  cursor: pointer;
  text-transform: capitalize;
  text-align: center;
  background-color: red;
  color: white;
  width: ${rem('200px')};
  height: ${rem('50px')};
  margin: ${rem('10px')};
  border-radius: 5px;
  vertical-align: middle;
  line-height: ${rem('50px')};
`;

const Confirm = styled.button.attrs({ type: 'button' })`
  cursor: pointer;
  text-transform: capitalize;
  text-align: center;
  background-color: #0047ab;
  color: white;
  width: ${rem('200px')};
  height: ${rem('50px')};
  margin: ${rem('10px')};
  border-radius: 5px;
  vertical-align: middle;
  line-height: ${rem('50px')};
`;

const Text = styled.div``;

export const GameEnd: React.FC<Props> = ({
  hasWon,
  score,
  onConfirm,
  onCancel
}: Props) => (
  <Modal>
    <Wrapper>
      <Title>
        {hasWon ? 'Congratulations' : 'Are you sure you want to exit?'}
      </Title>

      <Inner>
        <img src={components.diamond} alt="diamond" />
        <Text>+{Math.floor((score || 0) / 100)}</Text>
      </Inner>
      <ButtonWrapper>
        <Confirm onClick={onConfirm}>confirm</Confirm>
        {!hasWon && <Cancel onClick={onCancel}>cancel</Cancel>}
      </ButtonWrapper>
    </Wrapper>
  </Modal>
);
