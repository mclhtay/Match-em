import { Tile } from '../../../store/reducers/game';

export const checkEmptyBoard = (board: Tile[][]): boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j].key !== '') {
        return false;
      }
    }
  }
  return true;
};
