import * as React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/store/store';
import {
  GameState,
  updateGameAction,
  endGameAction
} from 'src/store/reducers/game';
import { prop, path } from 'ramda';
import { Loading } from 'src/components/Loading';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { portraits } from 'src/assets/portraits';
import { MatchGame } from 'src/components/MatchGame';
import { useDispatch } from 'react-redux';

const hexToRgb = (hex: string, alpha: number = 1): string => {
  hex = hex.slice(1);
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const GameWrapper = styled.div<{ color: string }>`
  display: flex;
  background-color: ${props => hexToRgb(props.color, 0.4)};
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const findColorKey = (key: string): string => {
  return portraits[key].color;
};

export const Game: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, inGame, board, score } = useSelector<StoreState, GameState>(
    prop('game')
  );
  const backgroundKey = useSelector<StoreState, string>(
    path(['user', 'defaultCharacter', 'key'])
  );

  if (loading) {
    return <Loading loadingMsg="loading" />;
  }
  if (!inGame) {
    return <Redirect to="/Match-em/main" />;
  }

  const handleEnd = () => {
    dispatch(endGameAction());
  };
  const handleUpdate = (x: number, y: number) => {
    dispatch(updateGameAction(x, y));
  };
  return (
    <GameWrapper color={findColorKey(backgroundKey)}>
      <MatchGame
        score={score}
        board={board}
        handleEnd={handleEnd}
        handleUpdate={handleUpdate}
      />
    </GameWrapper>
  );
};
