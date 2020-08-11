import * as React from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';
import { components } from '../../assets/components';
import { rem } from 'polished';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/store/store';
import { path } from 'ramda';
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
  text-align: center;
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
  width: 100%;
  font-size: ${rem('30px')};
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

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

const ImgWrapper = styled.div`
  max-width: 30%;
`;

const Text = styled.div`
  display: inline;
`;

const multiplier = 5;

const Multipler = styled.div`
  color: red;
  font-size: ${rem("50px")};
  font-weight: bold;
  display: inline;
  margin-left: 15px;
`;

export const GameEnd: React.FC<Props> = ({
  hasWon,
  score,
  onConfirm,
  onCancel
}: Props) => {

  const bonusDone = useSelector<StoreState, boolean>(path(['game', 'bonusDone']));

  return (<Modal>
    <Wrapper>
      <Title>
        {hasWon ? 'Congratulations' : 'Are you sure you want to exit?'}
      </Title>
      <Inner>
        <ImgWrapper>
          <img
            style={{ width: '100%' }}
            src={components.diamond}
            alt="diamond"
          />
        </ImgWrapper>
        <Text>+{Math.floor((score || 0) / 100)}
          <Multipler>{bonusDone && `x${multiplier}`}</Multipler></Text>
      </Inner>
      <ButtonWrapper>
        <Confirm onClick={onConfirm}>confirm</Confirm>
        {!hasWon && <Cancel onClick={onCancel}>cancel</Cancel>}
      </ButtonWrapper>
    </Wrapper>
  </Modal>)
};
