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
  width: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div<{ size: number }>`
  cursor: pointer;
  text-transform: capitalize;
  text-align: center;
  background-color: #0047ab;
  color: white;
  width: ${({ size }) => rem(`${size}px`)};
  height: ${rem('50px')};
  margin: ${rem('10px')};
  border-radius: 5px;
  vertical-align: middle;
  line-height: ${rem('50px')};
`;

const Text = styled.h1<{ size: number }>`
  font-size: ${({ size }) => rem(`${size}px`)};
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
  onScout,
  width
}: Props) => {
  return (
    <Wrapper>
      <Text size={width * 0.1}>{username}</Text>
      <DiamondWrapper>
        <Diamond src={components.diamond} alt="diamonds" />
        <Text size={width * 0.05}>x {diamonds}</Text>
      </DiamondWrapper>
      <Button size={width * 0.3} onClick={onGame}>
        Play
      </Button>
      <Button size={width * 0.3} onClick={onStorage}>
        Characters
      </Button>
      <Button size={width * 0.3} onClick={onScout}>
        Scout
      </Button>
    </Wrapper>
  );
};
