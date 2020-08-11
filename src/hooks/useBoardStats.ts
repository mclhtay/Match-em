import * as React from 'react';
import { Tile } from '../store/reducers/game';

const getTileNumber = (board: Tile[][]): number => {
  let count: number = 0;

  board.forEach(r => {
    r.forEach(c => {
      if (c.key !== '') {
        count++;
      }
    })
  })
  return count;
}


interface BoardStat {
  initialSize: number;
  currentSize: number;
  hasWon: boolean;
}

export const useBoardStats = (board: Tile[][]): BoardStat => {
  const [boardStat, setBoardStat] = React.useState<BoardStat>({ initialSize: -1, currentSize: -1, hasWon: false });
  React.useEffect(() => {
    const size = getTileNumber(board);
    if (boardStat.initialSize === -1)
      setBoardStat({ ...boardStat, initialSize: size, currentSize: size });
    else {
      setBoardStat({
        ...boardStat,
        currentSize: size,
        hasWon: size === 0
      })
    }
  }, [board]);
  return boardStat;
}