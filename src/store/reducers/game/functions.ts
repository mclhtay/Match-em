import { Tile } from './types';
import { allKeys } from 'src/assets/thumbnails';
import { compose, map } from 'ramda';

let adjList: number[] = [];

const traverseMatrix = (
  x: Array<Array<Tile>>,
  i: number,
  j: number,
  key: string,
  visited: boolean[][]
) => {
  if (
    i < 0 ||
    i >= x.length ||
    j < 0 ||
    j >= x[0].length ||
    (x[i][j].key !== key && x[i][j].key !== '') ||
    visited[i][j] === true
  ) {
    return;
  }
  visited[i][j] = true;
  if (x[i][j].key === '') {
    traverseMatrix(x, i - 1, j, key, visited);
    traverseMatrix(x, i + 1, j, key, visited);
    traverseMatrix(x, i, j - 1, key, visited);
    traverseMatrix(x, i, j + 1, key, visited);
  } else {
    adjList.push(x[i][j].sequence);
    if (adjList.length === 1) {
      traverseMatrix(x, i - 1, j, key, visited);
      traverseMatrix(x, i + 1, j, key, visited);
      traverseMatrix(x, i, j - 1, key, visited);
      traverseMatrix(x, i, j + 1, key, visited);
    }
  }
  return;
};

export const create2DArray = (x: number, y: number): boolean[][] => {
  const r: boolean[][] = [];
  for (let i = 0; i < x; i++) {
    r.push([]);
    for (let j = 0; j < y; j++) {
      r[i].push(false);
    }
  }
  return r;
};

export const findMatches = (x: Array<Array<Tile>>): Array<Array<Tile>> => {
  for (let i = 1; i < x.length - 1; i++) {
    for (let j = 1; j < x[0].length - 1; j++) {
      if (x[i][j].key) {
        adjList = [];
        let visited = create2DArray(8, 8);
        traverseMatrix(x, i, j, x[i][j].key, visited);
        adjList.splice(0, 1);
        x[i][j] = { ...x[i][j], pair: adjList };
      }
    }
  }
  return x;
};

const makeMatrix = (x: Array<Tile>): Array<Array<Tile>> => {
  const rowLen = Math.sqrt(x.length) + 2;

  const board: Array<any> = Array(rowLen).fill(Array(rowLen).fill(undefined));
  return board.map(
    (row, rowNum): Array<Tile> => {
      return row.map((_, colNum) => {
        const d: Tile = { pair: [], key: '', sequence: 0 };
        if (
          rowNum !== 0 &&
          rowNum !== board.length - 1 &&
          colNum !== 0 &&
          colNum !== board[0].length - 1
        ) {
          let xIndex = rowNum > 0 ? (rowNum - 1) * (rowLen - 2) : 0;
          xIndex = colNum > 0 ? xIndex + colNum - 1 : xIndex;
          const m = x[xIndex];
          d.key = m.key;
        }
        d.sequence = rowNum * rowLen + colNum;
        return d;
      });
    }
  );
};

const shuffle = (x: Array<Tile>): Array<Tile> => {
  x.sort(() => Math.random() - 0.5);
  return x.map((c, i) => ({ ...c, sequence: i }));
};

const fillPair = (requiredPairs: number) => (characters: Array<Tile>) => {
  characters.forEach(x => {
    for (let i = 0; i < requiredPairs - 1; i++) {
      characters.push(x);
    }
  });
  return characters;
};

const makePair = (characters: Array<Tile>): Array<Tile> => {
  characters.forEach(x => characters.push(x));
  return characters;
};

/**
 * @param {number} characterNum the number of characters to choose
 * @param {number} numPairs the number of pairs to make, must be the root of a perfect square
 * @returns {array of tile} array of randomized tiles with length of a perfect square
 */
export const generateBoard = (
  characterNum: number,
  numPairs: number
): Array<Array<Tile>> => {
  if (characterNum > allKeys.length) characterNum = allKeys.length;
  const chosenCharacters: string[] = [];
  const keys = [...allKeys];
  while (chosenCharacters.length < characterNum) {
    const i = Math.floor(Math.random() * keys.length);
    chosenCharacters.push(...keys.splice(i, 1));
  }

  return compose(
    findMatches,
    makeMatrix,
    shuffle,
    fillPair(numPairs),
    makePair,
    map(
      (c, i): Tile => ({
        sequence: i,
        key: c,
        pair: []
      })
    )
  )(chosenCharacters);
};
