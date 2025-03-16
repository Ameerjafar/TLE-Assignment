
import axios from 'axios'

import { CodeForcesType } from '../types';


interface ContestData  {
  codeForcesContests: CodeForcesType[]; 
  codeForcesContestTitles: string[];
  videoLink: string[];
};

export const fetchCodeforcesContest = async (): Promise<ContestData> => {
  try {

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/codeForcesRoute`);
    const allData: CodeForcesType[] = response.data.codeForcesContests;
    const videosLink = response.data.videos;
    const codeForcesContestTitles: string[] = [];
    const videoLink: string[] = []
    videosLink.forEach((vLink) => {
      codeForcesContestTitles.push(vLink.snippet.title.split('|')[0]);
      videoLink.push(vLink.snippet.resourceId.videoId);
  })
  // console.log("This is video link", videosLink);
    return {
      codeForcesContests: allData,
      videoLink,
      codeForcesContestTitles
    }
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error);
    return {
      codeForcesContests: [],
      videoLink: [],
      codeForcesContestTitles: []
    }
  }
};
