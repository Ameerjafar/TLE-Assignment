import express, { Request, Response } from "express";
import axios from "axios";
const codeChefRoute = express.Router();

codeChefRoute.get("/", async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://www.codechef.com/api/list/contests/all');
        res.status(200).json({message: response.data})
    }catch(error) {
        res.status(500).json({error});
    }
    
});

export default codeChefRoute;
