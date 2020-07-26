import * as React from 'react';
import styled from 'styled-components';
import { components } from 'src/assets/components';
import { rem } from 'polished';
interface Props {
  username: string;
  diamonds?: number;
  onGame: () => void;
  onStorage: () => void;
  onScout: () => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
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

const Text = styled.h1`
  font-size: ${rem('50px')};
`;

const DiamondWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: ${rem('100px')};
  align-items: center;
`;

const Diamond = styled.img`
  display: block;
  height: 90%;
`;

export const GamePanel: React.FC<Props> = ({
  username,
  diamonds,
  onGame,
  onStorage,
  onScout
}: Props) => {
  return (
    <Wrapper>
      <Text>{username}</Text>
      <DiamondWrapper>
        <Diamond src={components.diamond} alt="diamonds" />
        <Text>x {diamonds}</Text>
      </DiamondWrapper>
      <Button onClick={onGame}>Play</Button>
      <Button onClick={onStorage}>Characters</Button>
      <Button onClick={onScout}>Scout</Button>
    </Wrapper>
  );
};
