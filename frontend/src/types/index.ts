export interface CodeForcesType {
  id: number;
  name: string;
  type: string;
  phase: "BEFORE" | "FINISHED";
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
  solutionLink: string;
}

export interface LeetcodeType {
  title: string;
  startTime: number;
  duration: number;
  originStartTime: number,
  isVirtual: boolean
  solutionLink?: string
}

export interface CodeChefType {
  contest_code: string;
  contest_name: string;
  contest_duration: string;
  contest_start_date: string;
  contest_start_date_iso: string;
  contest_end_date: string;
  contest_end_date_iso: string;
  distinct_users: number;
  solutionLink?: string 
}



export interface UICardType {
  name: string;
  date: string;
  platform: string;
  isBookmarked?: boolean;
  solutionLink?: string; 
  onBookmark?: () => void; 
  onRemoveBookmark?: () => void; 
}