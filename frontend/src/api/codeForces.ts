
import axios from 'axios'

import { CodeForcesType } from '../types';
  

export const fetchCodeforcesContest = async () => {
  try {
    console.log("This is the codeforces url", import.meta.env.VITE_CODEFORCES_CONTESTS_API)
    const response = await axios.get(import.meta.env.VITE_CODEFORCES_CONTESTS_API);
    const allData: CodeForcesType[] = response.data.result;
    const firstTenData = allData.slice(0, 10);
    return firstTenData;
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error);
    return []
  }
};
