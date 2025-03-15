import express, { Request, Response } from "express";
import axios from "axios";
const leetCodeRoute = express.Router();

leetCodeRoute.get("/", async (req: Request, res: Response) => {
  const response = await axios.post("https://leetcode.com/graphql", {
    headers: {
      "Content-Type": "application/json",
    },
    query: `{
          topTwoContests{
            title
            startTime
            duration
            cardImg
          }
        }`,
  });
  res.status(200).json({leetcodeContests: response.data})
});

export default leetCodeRoute;
