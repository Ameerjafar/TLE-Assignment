import express from 'express';
import cors from 'cors'

import leetCodeRoute from './leetCodeRoute';
import codeChefRoute from './codeChefRoute';
const app = express();


app.use(express.json());

app.use(cors());

app.use('/leetCodeRoute', leetCodeRoute);
app.use('/codeChefRoute', codeChefRoute);


app.listen(3000, () => {
    console.log("Backend is running on port number 3000");
})