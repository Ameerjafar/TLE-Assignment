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
    title: string,
    startTime: number,
    duration: number, 
    cardImg: string | null
}