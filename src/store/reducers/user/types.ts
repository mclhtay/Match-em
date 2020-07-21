export interface UserState {
  username: string;
  diamonds: number | undefined;
  loading: boolean;
  characters: Characters;
  defaultCharacter: Character;
}

export interface UserRecord {
  username?: string;
  diamonds?: number;
}

export interface Character {
  name: string;
  key: string;
}

export type Characters = Character[];
