import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserRecord } from './types';
import { localHistoryKey } from '../../constants';

const initialState: UserState = {
  username: '',
  diamonds: undefined,
  loading: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoaded: (state, action: PayloadAction<UserRecord>) => {
      state.username = action.payload.username;
      state.diamonds = action.payload.diamonds;
      state.loading = false;
    }
  }
});

const { userLoaded } = userSlice.actions;

export default userSlice.reducer;

export const loadUserAction = () => dispatch => {
  const history = localStorage.getItem(localHistoryKey);
  if (history) {
    const { username, diamonds } = JSON.parse(history);
    dispatch(
      userLoaded({
        username,
        diamonds
      })
    );
  } else {
    dispatch(
      userLoaded({
        username: '',
        diamonds: -1
      })
    );
  }
};
