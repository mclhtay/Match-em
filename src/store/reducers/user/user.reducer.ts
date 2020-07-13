import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserRecord } from './types';
import { localHistoryKey } from '../../constants';
import camelcase from 'camelcase-keys';
import { compose, mergeAll, reduce } from 'ramda';
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
      state.username = action.payload.username || state.username;
      state.diamonds = action.payload.diamonds || state.diamonds;
      state.loading = false;
    },
    userUpdate: (state, action: PayloadAction<UserRecord>) => {
      Object.keys(action.payload).forEach(k => {
        state[k] = action.payload[k];
      });
    }
  }
});

const { userLoaded, userUpdate } = userSlice.actions;

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

export const updateUserAction = (updates: UserRecord) => dispatch => {
  const casedKeys = camelcase(updates);
  dispatch(userUpdate(casedKeys));

  const history = localStorage.getItem(localHistoryKey);
  const makeArray = o1 => o2 => [o2, o1];
  const updatedHistory = compose(
    JSON.stringify,
    mergeAll,
    makeArray(casedKeys),
    JSON.parse
  )(history);
  console.log(updatedHistory);
  localStorage.setItem(localHistoryKey, updatedHistory);
};
