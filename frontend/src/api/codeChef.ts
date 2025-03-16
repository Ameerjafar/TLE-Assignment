import axios from "axios";
import { CodeChefType } from "../types";
interface ContestData  {
    futureContests: CodeChefType[]; 
    pastContests: CodeChefType[];
    videos: string[];
    codeChefTitle: string[];
  };
export const fetchCodeChefContests = async (): Promise<ContestData> => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/codeChefRoute`);
        const allData: CodeChefType[] = response.data.pastContests;
        const videoLink: string[] = []
        const videosLink = response.data.videos
        const codeChefTitle: string[] = []
    videosLink.forEach((vLink) => {
        codeChefTitle.push(vLink.snippet.title.split('|')[0]);
      videoLink.push(vLink.snippet.resourceId.videoId);
        })
        console.log(response.data);
        return { 
            videos: videoLink,
            pastContests: allData, 
            futureContests: response.data.futureContests,
            codeChefTitle 
        };
    } catch (error) {
        console.log(error);
        return { pastContests: [], futureContests: [], videos: [], codeChefTitle: []};
    }
};
