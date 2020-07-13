export interface UserState {
  username: string;
  diamonds: number | undefined;
  loading: boolean;
}

export interface UserRecord {
  username?: string;
  diamonds?: number;
}
