import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../store/store';
import { Loading } from '../../components/Loading';
import { loadUserAction, updateUserAction } from '../../store/reducers/user';
import { SignUpForm } from '../../components/SignUpForm';
import { signUpFormElements } from '../constants';
import { WelcomeUser } from '../WelcomeUser';

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
  }, [dispatch]);

  if (userLoadingState) {
    return <Loading loadingMsg="Loading ... " />;
  }

  return (
    <>
      {userRegistered ? (
        <WelcomeUser />
      ) : (
        <SignUpForm
          formElements={signUpFormElements}
          submitAction={updateUserAction}
        />
      )}
    </>
  );
};
