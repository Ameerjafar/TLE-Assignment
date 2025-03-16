import axios from "axios"
import { LeetcodeType } from "../types";


interface ContestData  {
    leetCodeContests: LeetcodeType[]; 
    titles: string[];
    videoLink: string[];
};

export const fetchLeetcodeContests = async (): Promise<ContestData> => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/leetCodeRoute`);
        // console.log(response.data.leetcodeContests.data.topTwoContests)
        // console.log(response.data.leetcodeContests)
        // console.log(response.data.videos);
        const videos = response.data.videos;
        const titles: string[] = [];
        const videoLink: string[] = [];
        videos.forEach((video) => {
            titles.push(video.snippet.title.split('|')[0]);
            videoLink.push(video.snippet.resourceId.videoId);
        })
        return {
            leetCodeContests: response.data.leetCodeContests,
            titles: titles,
            videoLink: videoLink
        };
    } catch(error) {
        console.log("This is the error you got", error);
        return {
            leetCodeContests: [],
            titles: [],
            videoLink: []
        };
    }
}