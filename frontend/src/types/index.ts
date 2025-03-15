export interface CodeForcesType {
  id: number;
  name: string;
  type: string;
  phase: "BEFORE" | "FINISHED";
  frozen: boolean;
  durationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
}

export interface LeetcodeType {
  title: string;
  startTime: number;
  duration: number;
  cardImg: string | null;
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
}



export interface UICardType {
  name: string;
  date: string;
  platform: string;
};