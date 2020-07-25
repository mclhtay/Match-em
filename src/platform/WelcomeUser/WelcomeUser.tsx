import * as React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/store';
import { prop } from 'ramda';
import { UserState } from '../../store/reducers/user';
import { NewUser } from './NewUser';
import { Redirect } from 'react-router-dom';

export const WelcomeUser: React.FC = () => {
  const userState = useSelector<StoreState, UserState>(prop('user'));
  const { isDoneOnboarding } = userState;

  return <>{isDoneOnboarding ? <Redirect to="/main" /> : <NewUser />}</>;
};
