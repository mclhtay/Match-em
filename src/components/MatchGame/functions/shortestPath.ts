import { Tile } from '../../../store/reducers/game';
import { false2DArray } from './false2DArray';

interface PathElement {
  i: number;
  j: number;
  path?: string[]
}

export const shortestPath = (board: Tile[][], start: number, end: number): string[] => {
  const visited = false2DArray(board.length, board[0].length);
  visited[Math.floor(start / 8)][start % 8] = true;
  const queue: PathElement[] = [];
  queue.push({ i: Math.floor(start / 8), j: start % 8 });

  while (queue.length > 0) {
    const { i, j, path } = queue.shift() || { i: 0, j: 0, path: [] };
    if (board[i][j].sequence === end) {
      return path || [];
    }

    if (i - 1 >= 0 && (board[i - 1][j].key === '' || board[i - 1][j].sequence === end) && !visited[i - 1][j]) {
      visited[i - 1][j] = true;
      queue.push({
        i: i - 1,
        j: j,
        path: path ? [...path, "UP"] : ["UP"]
      });
    }

    if (i + 1 < board.length && (board[i + 1][j].key === '' || board[i + 1][j].sequence === end) && !visited[i + 1][j]) {
      visited[i + 1][j] = true;
      queue.push({
        i: i + 1,
        j: j,
        path: path ? [...path, "DOWN"] : ["DOWN"]
      });
    }

    if (j - 1 >= 0 && (board[i][j - 1].key === '' || board[i][j - 1].sequence === end) && !visited[i][j - 1]) {
      visited[i][j - 1] = true;
      queue.push({
        i: i,
        j: j - 1,
        path: path ? [...path, "LEFT"] : ["LEFT"]
      });
    }

    if (j + 1 < board[0].length && (board[i][j + 1].key === '' || board[i][j + 1].sequence === end) && !visited[i][j + 1]) {
      visited[i][j + 1] = true;
      queue.push({
        i: i,
        j: j + 1,
        path: path ? [...path, "RIGHT"] : ["RIGHT"]
      });
    }

  }

  return [];

}