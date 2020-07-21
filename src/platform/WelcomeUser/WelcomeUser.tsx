import * as React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { prop } from 'ramda';
import { portraits } from 'src/assets/portraits';
import { UserState } from '../../store/reducers/user';
import { NewUser } from './NewUser';

export const WelcomeUser: React.FC = () => {
  const userState = useSelector<StoreState, UserState>(prop('user'));
  const { username, characters } = userState;

  return <>{characters.length > 0 ? <div>{username}</div> : <NewUser />}</>;
};
