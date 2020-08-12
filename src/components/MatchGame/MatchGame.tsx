import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Tile } from 'src/store/reducers/game';
import { thumbnails } from 'src/assets/thumbnails';
import { rem } from 'polished';
import debounce from 'lodash.debounce';
import { GameEnd } from '../GameEnd';
import { useBoardStats } from 'src/hooks/useBoardStats';
import { Timer } from '../Timer';
import { shortestPath, drawLine } from './functions';
interface Props {
  score: number;
  board: Tile[][];
  handleEnd: () => void;
  handleUpdate: (x: number, y: number) => void;
}

const Disappear = keyframes`
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;

const GameWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 80%;
  border: 1px solid rgba(0, 0, 0, 0.4);
  color: black;
  border-radius: 5px;
`;

const Score = styled.h1`
  font-size: ${rem('20px')};
  color: black;
  display: flex;
  width: 55%;
  justify-content: flex-end;
`;
const ExitWrapper = styled.div`
  display: flex;
  width: 45%;
  justify-content: flex-end;
`;
const Exit = styled.button.attrs({ type: 'button' })`
  border-radius: 5px;
  background: red;
  opacity: 0.5;
  color: white;
  height: ${rem('40px')};
  margin-right: ${rem('50px')};
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const TileWrapper = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
  border: boolean;
  selected: boolean;
}>`
  position: absolute;
  display: inline-block;
  top: ${props => `${props.top}px`};
  left: ${props => props.left + 'px'};
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  border: ${props => (props.border ? '1px solid black' : 'none')};
  border-radius: 5px;
  &:hover {
    ${props => (props.border ? 'cursor: pointer' : 'none')};
  }
  ${props => props.selected && 'border: 2px solid white'};
  img{
    -webkit-user-drag: none;
  }
`;

const Check = styled.div<{ success: boolean; top: number; left: number }>`
  position: absolute;
  z-index: 9999;
  background-color: ${props => (props.success ? '#50C878' : '#FF0800')};
  color: ${props => (props.success ? 'white' : 'black')};
  top: ${props => props.top + 'px'};
  left: ${props => props.left + 'px'};
  animation: ${Disappear} 0.5s linear;
  width: ${rem('100px')};
  height: ${rem('100px')};
  font-size: ${rem('50px')};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
`;

const ScoreWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const MatchGame: React.FC<Props> = ({
  score,
  board,
  handleEnd,
  handleUpdate
}: Props) => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<number>(-1);
  const [matched, setMatched] = React.useState<boolean | undefined>(undefined);
  const [check, setCheck] = React.useState<boolean | undefined>(undefined);
  const [done, setDone] = React.useState<boolean>(false);
  const { initialSize, currentSize, hasWon } = useBoardStats(board);

  React.useEffect(() => {
    if (panelRef.current) {
      setHeight(panelRef.current.clientHeight);
      setWidth(panelRef.current.clientWidth);
    }
  }, []);

  React.useEffect(() => {
    if (hasWon) {
      setDone(true);
    }
  }, [hasWon]);

  React.useEffect(() => {
    const handleResize = debounce(function setDimenstions() {
      if (panelRef.current) {
        setHeight(panelRef.current.clientHeight);
        setWidth(panelRef.current.clientWidth);
      }
    }, 500);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const tileHeight = Math.floor(height / 8);
  const tileWidth = Math.floor(width / 8);

  const handleSelect = (seq: number) => {
    if (selected === -1) {
      setSelected(seq);
    } else {
      if (seq === selected) {
        setSelected(-1);
        return;
      }

      let adjList: number[] = [];
      for (var row of board) {
        var found = false;
        for (var col of row) {
          if (col.sequence === selected) {
            adjList = col.pair;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (adjList.includes(seq)) {
        const path = (shortestPath(board, selected, seq));
        setMatched(true);
        drawLine(tileWidth, tileHeight, path, selected);
        setCheck(true);

        handleUpdate(selected, seq);
      } else {
        setMatched(false);
        setCheck(false);
      }
      setSelected(-1);
      setTimeout(() => {
        setMatched(undefined);
        setTimeout(() => {
          setCheck(undefined);
        }, 500)
      }, 100);
    }
  };

  return (
    <>
      {currentSize / initialSize <= 0.5 && <Timer hasWon={hasWon} />}
      <ScoreWrapper>
        <Score>score: {score}</Score>
        <ExitWrapper>
          <Exit onClick={() => setDone(true)}>exit</Exit>
        </ExitWrapper>
      </ScoreWrapper>

      <GameWrapper ref={panelRef}>
        <canvas id="lineCanvas" width={width} height={height} />
        {check !== undefined &&
          (check ? (
            <Check
              top={height / 2 - 50}
              left={width / 2 - 50}
              success={check}
            >
              &#10004;
            </Check>
          ) : (
              <Check
                top={height / 2 - 50}
                left={width / 2 - 50}
                success={check}
              >
                &#10005;
              </Check>
            ))}
        {board.map(r =>
          r.map(c => {
            const seq = c.sequence;
            const top = Math.floor(seq / 8) * tileHeight;
            const left = Math.floor(seq % 8) * tileWidth;
            return (
              <TileWrapper
                key={seq}
                top={top}
                left={left}
                height={tileHeight}
                width={tileWidth}
                border={thumbnails[c.key] ? true : false}
                selected={selected === seq}
                onClick={() =>
                  thumbnails[c.key] &&
                  matched === undefined &&
                  handleSelect(seq)
                }
              >
                {thumbnails[c.key] && (
                  <img
                    src={thumbnails[c.key].src}
                    alt={c.key}
                    height="100%"
                    width="100%"
                  />
                )}
              </TileWrapper>
            );
          })
        )}
      </GameWrapper>
      {done && (
        <GameEnd
          score={score}
          hasWon={done}
          onConfirm={handleEnd}
          onCancel={() => setDone(false)}
        />
      )}
    </>
  );
};
