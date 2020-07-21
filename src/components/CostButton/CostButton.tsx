import * as React from 'react';
import styled from 'styled-components';
import { components } from 'src/assets/components';
import { rem } from 'polished';

interface Props {
  cost: number;
  scout: () => void;
  disabled: boolean;
}

const ButtonWrapper = styled.div`
  max-width: ${rem('300px')};
  max-height: ${rem('100px')};
  background-color: khaki;
  transform: skew(-10deg);
  border-radius: 5px;
  opacity: 1;
  cursor: pointer;
  &:hover {
    background-color: yellow;
  }
  &.disable {
    cursor: not-allowed;
    background-color: gray;
  }
`;

const ButtonInner = styled.div`
  display: flex;
  align-items: center;
  transform: skew(10deg);
`;

const ButtonIcon = styled.div``;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  margin: ${rem('20px')};
  color: black;
  font-size: ${rem('20px')};
`;

const ButtonSubtext = styled.div`
  text-transform: capitalize;
  font-size: ${rem('10px')};
`;

export const CostButton: React.FC<Props> = ({
  cost,
  scout,
  disabled: userDiamonds
}: Props) => {
  return (
    <ButtonWrapper
      className={userDiamonds ? undefined : 'disable'}
      onClick={scout}
    >
      <ButtonInner>
        <ButtonIcon>
          <img src={components.diamond} alt="diamond" height="100px" />
        </ButtonIcon>
        <ButtonContent>
          cost: {cost}
          {!userDiamonds && <ButtonSubtext>not enough diamonds</ButtonSubtext>}
        </ButtonContent>
      </ButtonInner>
    </ButtonWrapper>
  );
};
