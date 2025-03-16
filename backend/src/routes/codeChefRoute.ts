import express, { Request, Response } from "express";
import axios from "axios";
const codeChefRoute = express.Router();

codeChefRoute.get("/", async (req: Request, res: Response) => {
    try {
        const response = await axios.get(process.env.CODECHEF_ALLCONTESTS_API!);

        const youTubeResponse = await axios.get(process.env.YOU_TUBE_API_URL!,
            {
              params: {
                part: "snippet",
                playlistId: process.env.CODECHEF_PLAYLIST,
                maxResults: 50, 
                key: process.env.API_KEY
              },
            }
          );
          const videos = youTubeResponse.data.items;
          videos.forEach((video: any) => {
            console.log(video.snippet.title.split('|')[0]);
          })
        res.status(200).json({
            futureContests: response.data.future_contests, 
            pastContests: response.data.past_contests,
            videos: videos
        })
    }catch(error) {
        res.status(500).json({error});
    }
    
});

export default codeChefRoute;
