import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { Loading } from '../../components/Loading';
import { loadUserAction } from '../../store/reducers/user';

export const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const userLoadingState = useSelector<StoreState, boolean>(
    state => state.user.loading
  );
  const userRegistered = useSelector<StoreState, string>(
    state => state.user.username
  );

  React.useEffect(() => {
    dispatch(loadUserAction());
  }, []);

  if (userLoadingState) {
    return <Loading loadingMsg="Loading ... " />;
  }

  return <>{userRegistered ? userRegistered : 'None'}</>;
};
