import express, { Request, Response } from 'express';

import axios from 'axios';


const codeForcesRoutes = express.Router();

codeForcesRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(process.env.CODEFORCES_ALLCONTESTS_API!);
        const allData = response.data.result;
        const youTubeResponse = await axios.get(process.env.YOU_TUBE_API_URL!,
          {
            params: {
              part: "snippet",
              playlistId: process.env.CODEFORCES_PLAYILST,
              maxResults: 50, 
              key: process.env.API_KEY
            },
          }
        );
        const videos = youTubeResponse.data.items;
        videos.forEach((video: any) => {
          console.log(video.snippet.title.split('|')[0]);
        })
        const codeForcesContests = allData;
        res.json({
          codeForcesContests,
          videos
        });
      } catch (error) {
        console.error("Error fetching Codeforces contests:", error);
        res.json({error});
      }
})

export default codeForcesRoutes;