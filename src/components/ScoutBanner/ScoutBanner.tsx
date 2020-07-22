import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { portraits, allKeys } from 'src/assets/portraits';
import { exitScoutAction } from 'src/store/reducers/scout';
import { useDispatch } from 'react-redux';
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
const blink = keyframes`
  0%{
    opacity: 0.5
  }
  50%{
    opacity: 0
  }
  100%{
    opacity: 0.5
  }
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
  &.flash {
    animation: ${blink} 1s infinite;
  }
`;

const BannerImg = styled.img.attrs({ width: '170px', height: '200px' })`
  opacity: 1;
`;

interface Props {
  animationIndex: Array<number>;
  inScout: boolean;
  finalIndex: number;
}

export const ScoutBanner: React.FC<Props> = ({
  animationIndex,
  inScout,
  finalIndex
}: Props) => {
  const dispatch = useDispatch();

  const [curr, setCurr] = React.useState<{ index: number; value: number }>({
    index: -1,
    value: -1
  });

  React.useEffect(() => {
    if (curr.index < animationIndex.length && inScout) {
      const timer = setTimeout(
        () =>
          setCurr({
            index: curr.index + 1,
            value: animationIndex[++curr.index]
          }),
        100
      );
      return () => clearTimeout(timer);
    } else if (curr.index === animationIndex.length) {
      setCurr({ index: curr.index + 1, value: finalIndex });
    } else if (curr.index === animationIndex.length + 1) {
      const timer = setTimeout(() => dispatch(exitScoutAction()), 3000);

      return () => clearTimeout(timer);
    }
  }, [inScout, curr.index, animationIndex, curr, finalIndex, dispatch]);
  return (
    <BannerWrapper>
      {allKeys.map((key, index) => (
        <BannerItem key={key}>
          <BannerImg src={portraits[key].src} alt={portraits[key].name} />
          {curr.value === index && (
            <BannerOverlay
              className={curr.value === finalIndex ? 'flash' : undefined}
            />
          )}
        </BannerItem>
      ))}
    </BannerWrapper>
  );
};
