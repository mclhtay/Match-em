export interface ScoutState {
  inScout: boolean;
  isDone: boolean;
  index: Array<number>;
  finalIndex: number;
  scouted: {
    name: string;
    code: string;
  };
}
