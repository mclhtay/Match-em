import * as React from 'react';
import styled from 'styled-components';
import { Foreground } from '../Foreground';
import left from '../../assets/portraits/a-sinon.png';
import right from '../../assets/portraits/w-kirito.png';
import { isMobile } from 'react-device-detect';

const WebWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #232b2b;
  font-family: 'MuseoModerno', cursive;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.div`
  position: relative;
  img {
    max-width: 90%;
  }
`;

interface Props {
  children: React.ReactNode;
}

export const WebBackground: React.FC<Props> = ({ children }: Props) => (
  <WebWrapper>
    {!isMobile && (
      <Image>
        <img src={left} alt="left display" />
      </Image>
    )}

    <Foreground isMobile={isMobile}>{children}</Foreground>
    {!isMobile && (
      <Image>
        <img src={right} alt="right display" />
      </Image>
    )}
  </WebWrapper>
);
