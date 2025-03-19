import express from 'express';
import cors from 'cors'
import router from './routes/route';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(express.json());

app.use(cors());

app.use('/', router);



app.listen(3000, () => {
    console.log("Backend is running on port number 3000");
})