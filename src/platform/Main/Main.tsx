import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prop } from 'ramda';
import { StoreState } from '../../store/store';
import { UserState } from '../../store/reducers/user';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { CharacterPanel } from 'src/components/CharacterPanel';
import { GamePanel } from 'src/components/GamePanel';
import { StorageModal } from 'src/components/StorageModal';

const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: black;
  color: white;
  position: relative;
  display: flex;
  align-items: center;
`;

enum VIEW_STATE {
  MAIN,
  GAME,
  STORAGE,
  SCOUT
}

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<StoreState, UserState>(prop('user'));

  const [viewState, setViewState] = React.useState<VIEW_STATE>(VIEW_STATE.MAIN);
  const {
    defaultCharacter: { key },
    username,
    diamonds,
    characters
  } = user;
  if (!key) return <Redirect to="/" />;

  const handleGame = () => {};
  const handleStorage = () => {
    setViewState(VIEW_STATE.STORAGE);
  };
  const handleScout = () => {};

  return (
    <>
      {viewState === VIEW_STATE.STORAGE && (
        <StorageModal characters={characters} />
      )}
      <MainWrapper>
        <CharacterPanel character={key} />
        <GamePanel
          username={username}
          diamonds={diamonds}
          onGame={handleGame}
          onStorage={handleStorage}
          onScout={handleScout}
        />
      </MainWrapper>
    </>
  );
};
