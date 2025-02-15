export interface Score {
  type: string;
  score: number;
  date: string;
  index?: number;
}

export interface UserProfile {
  displayName: string;
  dateJoined: string;
}