import * as React from 'react';
import styled from 'styled-components';
import { portraits, allKeys } from 'src/assets/portraits';

const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const BannerItem = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  position: relative;
`;

const BannerOverlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: yellow;
  background-color: yellow;
  opacity: 0.3;
  z-index: 99;
  display: block;
`;

const BannerImg = styled.img.attrs({ width: '170px', height: '200px' })`
  opacity: 1;
`;

export const ScoutBanner: React.FC = () => (
  <BannerWrapper>
    {allKeys.map((key, index) => (
      <BannerItem key={key}>
        <BannerImg src={portraits[key].src} alt={portraits[key].name} />
      </BannerItem>
    ))}
  </BannerWrapper>
);
