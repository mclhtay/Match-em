export interface GameState {
  inGame: boolean;
  board: Array<Array<Tile>>;
  score: number;
  loading: boolean;
  bonusDone: boolean;
}

export interface Tile {
  sequence: number;
  key: string;
  pair: Array<number>;
}
