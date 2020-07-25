export interface UserState {
  username: string;
  diamonds: number | undefined;
  loading: boolean;
  characters: Characters;
  defaultCharacter: Character;
  isDoneOnboarding: boolean;
}

export interface UserRecord {
  username?: string;
  diamonds?: number;
  characters?: Characters;
  defaultCharacter?: Character;
}

export interface Character {
  name: string;
  key: string;
}

export type Characters = Character[];
