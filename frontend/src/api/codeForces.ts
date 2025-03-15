
import axios from 'axios'

import { CodeForcesType } from '../types';
  

export const fetchCodeforcesContest = async () => {
  try {

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/codeForcesRoute`);
    const allData: CodeForcesType[] = response.data.firstTenData;
    const firstTenData = allData.slice(0, 10);
    return firstTenData;
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error);
    return []
  }
};
