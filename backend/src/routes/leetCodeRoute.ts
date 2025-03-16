import express, { Request, Response } from "express";
import axios from "axios";
const leetCodeRoute = express.Router();

leetCodeRoute.get("/", async (req: Request, res: Response) => {
  const response = await axios.post(process.env.LEETCODE_ALLCONTESTS_API!, {
    headers: {
      "Content-Type": "application/json",
    },
    query: `{
          allContests{
            title
            startTime
            duration
            originStartTime
            isVirtual
          }
        }`,
  });
  const youTubeResponse = await axios.get(process.env.YOU_TUBE_API_URL!,
      {
        params: {
          part: "snippet",
          playlistId: process.env.LEETCODE_PLAYLIST,
          maxResults: 50, 
          key: process.env.API_KEY
        },
      }
    );
    const videos = youTubeResponse.data.items;
    videos.forEach((video: any) => {
      console.log(video.snippet.title.split('|')[0]);
    })
  // console.log(response.data.data.allContests);
  res.status(200).json({leetCodeContests: response.data.data.allContests, videos});
});

export default leetCodeRoute;
