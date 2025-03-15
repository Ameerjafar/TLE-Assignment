import express, { Request, Response } from 'express';

import axios from 'axios';


const codeForcesRoutes = express.Router();

codeForcesRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const response = await axios.get("https://codeforces.com/api/contest.list");
        // console.log("This is the codeforces url", import.meta.env.VITE_CODEFORCES_CONTESTS_API)
        // const response = await axios.get(import.meta.env.VITE_CODEFORCES_CONTESTS_API);
        const allData = response.data.result;
        const firstTenData = allData.slice(0, 10);
        res.json({firstTenData});
      } catch (error) {
        console.error("Error fetching Codeforces contests:", error);
        res.json({error});
      }
})

export default codeForcesRoutes;