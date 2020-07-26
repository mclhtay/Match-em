import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prop } from 'ramda';
import { StoreState } from '../../store/store';
import { UserState } from '../../store/reducers/user';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { CharacterPanel } from 'src/components/CharacterPanel';
import { GamePanel } from 'src/components/GamePanel';
const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: black;
  color: white;
  position: relative;
  display: flex;
  align-items: center;
`;

export const Main: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector<StoreState, UserState>(prop('user'));
  const {
    defaultCharacter: { key },
    username,
    diamonds,
    characters
  } = user;
  if (!key) return <Redirect to="/" />;

  const handleGame = () => {};
  const handleStorage = () => {};
  const handleScout = () => {};

  return (
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
  );
};
