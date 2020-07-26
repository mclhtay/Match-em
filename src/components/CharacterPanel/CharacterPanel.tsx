import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { components } from 'src/assets/components';
import { portraits } from 'src/assets/portraits';
import { rem } from 'polished';

interface Props {
  character: string;
}

const Wrapper = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const WrapperOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
`;

const roll = keyframes`
  0%{
    transform: rotate(0deg)
  }
  50%{
    transform: rotate(180deg)
  }
  100%{
    transform: rotate(360deg)
  }
`;

const BackgroundWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Background = styled.img.attrs({
  src: components.controller,
  alt: 'Background'
})`
  display: block;
  animation: ${roll} 10s linear infinite;
  opacity: 0.7;
  width: 100%;
`;

const Character = styled.img.attrs({ alt: 'Default char' })`
  display: block;
  position: absolute;
  z-index: 99;
  width: 100%;
  top: 0;
`;

const CharacterWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CharacterName = styled.h1<{ color: string }>`
  font-size: ${rem('80px')};
  text-transform: capitalize;
  margin: ${rem('10px')};
  color: ${props => props.color};
`;

export const CharacterPanel: React.FC<Props> = ({ character }: Props) => {
  character = 'yui';
  return (
    <Wrapper>
      <BackgroundWrapper>
        <CharacterName color={portraits[character].color}>
          {portraits[character].name}
        </CharacterName>
        <CharacterWrapper>
          <Background />
          <Character src={portraits[character].src} />
        </CharacterWrapper>
      </BackgroundWrapper>
      <WrapperOverlay />
    </Wrapper>
  );
};
