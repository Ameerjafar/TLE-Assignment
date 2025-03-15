import express from 'express'
import codeChefRoute from './codeChefRoute';
import leetCodeRoute from './leetCodeRoute';
import codeForcesRoute from './codeForcesRoute';
const router = express.Router();


router.use('/codeChefRoute', codeChefRoute);
router.use('/leetCodeRoute', leetCodeRoute);
router.use('/codeForcesRoute', codeForcesRoute);


export default router;