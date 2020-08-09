import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, Tile } from './types';
import { generateBoard, findMatches } from './functions';
import { updateUserAction } from '../user';
const initialState: GameState = {
  loading: false,
  board: [],
  inGame: false,
  score: 0
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: state => {
      state.loading = true;
      state.inGame = true;
    },
    boardLoaded: (state, action: PayloadAction<{ board: Tile[][] }>) => {
      state.loading = false;
      state.board = action.payload.board;
    },
    endGame: () => initialState,
    updateGame: (
      state,
      action: PayloadAction<{ board: Tile[][]; score: number }>
    ) => {
      state.board = action.payload.board;
      state.score = action.payload.score;
    }
  }
});

const { startGame, boardLoaded, endGame, updateGame } = gameSlice.actions;

export default gameSlice.reducer;

export const startGameAction = () => dispatch => {
  dispatch(startGame());

  const board = generateBoard(9, 2);
  console.log(board);
  dispatch(boardLoaded({ board }));
};

export const updateGameAction = (seq1: number, seq2: number) => (
  dispatch,
  getState
) => {
  const {
    game: { board, score }
  } = getState();
  let newBoard = board.map(r =>
    r.map(c =>
      c.sequence === seq1 || c.sequence === seq2
        ? { ...c, key: '', pair: [] }
        : c
    )
  );
  console.log(newBoard);
  newBoard = findMatches(newBoard);
  dispatch(updateGame({ board: newBoard, score: score + 100 }));
};

export const endGameAction = () => (dispatch, getState) => {
  const {
    user: { diamonds },
    game: { score }
  } = getState();
  dispatch(updateUserAction({ diamonds: diamonds + Math.floor(score / 100) }));
  dispatch(endGame());
};
