import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScoutState } from './types';
import { portraits, allKeys } from 'src/assets/portraits';

const initialState: ScoutState = {
  isDone: false,
  inScout: false,
  finalIndex: -1,
  index: [],
  scouted: {
    name: '',
    code: ''
  }
};

const scoutSlice = createSlice({
  name: 'scout',
  initialState,
  reducers: {
    enterScout: (
      state,
      action: PayloadAction<{
        finalIndex: number;
        index: Array<number>;
        scouted: { name: string; code: string };
      }>
    ) => {
      state.inScout = true;
      state.finalIndex = action.payload.finalIndex;
      state.index = action.payload.index;
      state.scouted = action.payload.scouted;
    },
    exitScout: (state, action) => {
      state.isDone = true;
    },
    resetScout: (state, action) => initialState
  }
});

const { enterScout, exitScout, resetScout } = scoutSlice.actions;

export default scoutSlice.reducer;

const genIndex = (maxIndex: number, prev?: number) => {
  let curr = Math.floor(Math.random() * maxIndex);
  if (prev) {
    curr = curr === prev ? (curr === maxIndex - 1 ? curr - 1 : curr + 1) : curr;
  }
  return curr;
};

export const enterScoutAction = () => dispatch => {
  const finalIndex = genIndex(allKeys.length);

  const scoutIndexes: Array<number> = [];

  for (let i = 0; i < 50; i++)
    scoutIndexes.push(genIndex(allKeys.length, scoutIndexes[i - 1]));
  dispatch(
    enterScout({
      finalIndex,
      index: scoutIndexes,
      scouted: {
        code: allKeys[finalIndex],
        name: portraits[allKeys[finalIndex]].name
      }
    })
  );
};

export const exitScoutAction = () => dispatch => {
  dispatch(exitScout({}));
};
export const resetScoutAction = () => dispatch => {
  dispatch(resetScout({}));
};
