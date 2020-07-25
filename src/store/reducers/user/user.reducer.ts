import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserRecord } from './types';
import { localHistoryKey } from '../../constants';
import camelcase from 'camelcase-keys';
import { compose, mergeAll, uniq } from 'ramda';

const initialState: UserState = {
  username: '',
  diamonds: 0,
  loading: true,
  characters: [],
  defaultCharacter: { name: '', key: '' },
  isDoneOnboarding: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoaded: (state, action: PayloadAction<UserRecord>) => {
      state.username = action.payload.username || state.username;
      state.diamonds = action.payload.diamonds || state.diamonds;
      state.characters = action.payload.characters || state.characters;
      state.defaultCharacter =
        action.payload.defaultCharacter || state.defaultCharacter;
      state.loading = false;
    },
    userUpdate: (state, action: PayloadAction<UserRecord>) => {
      Object.keys(action.payload).forEach(k => {
        state[k] = action.payload[k];
      });
    },
    userExist: (state, action) => {
      state.isDoneOnboarding = true;
    }
  }
});

const { userLoaded, userUpdate, userExist } = userSlice.actions;

export default userSlice.reducer;

export const userExistAction = () => dispatch => {
  dispatch(userExist({}));
};

export const loadUserAction = () => dispatch => {
  const history = localStorage.getItem(localHistoryKey);
  if (history) {
    const { username, diamonds, defaultCharacter, characters } = JSON.parse(
      history
    );
    dispatch(
      userLoaded({
        username,
        diamonds,
        defaultCharacter,
        characters
      })
    );
    dispatch(userExist({}));
  } else {
    dispatch(
      userLoaded({
        username: '',
        diamonds: 0,
        characters: [],
        defaultCharacter: { name: '', key: '' }
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

export const saveScoutAction = (cost: number) => (dispatch, getState) => {
  const {
    scout: {
      scouted: { code, name }
    },
    user: { diamonds, characters, defaultCharacter, username }
  } = getState();

  const push = toAdd => existing => [...existing, toAdd];

  const updatedCharacters = compose(
    uniq,
    push({ key: code, name })
  )(characters);

  const updates: UserRecord = {
    username,
    diamonds: diamonds - cost,
    defaultCharacter: defaultCharacter.name
      ? defaultCharacter
      : { key: code, name },
    characters: updatedCharacters
  };

  dispatch(updateUserAction(updates));
};
