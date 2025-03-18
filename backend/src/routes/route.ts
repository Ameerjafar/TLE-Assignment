import express from 'express'
import codeChefRoute from './codeChefRoute';
import leetCodeRoute from './leetCodeRoute';
import codeForcesRoute from './codeForcesRoute';
import authRoute from './authRoute';
import emailRoute from './emailRoutes';
const router = express.Router();


router.use('/codeChefRoute', codeChefRoute);
router.use('/leetCodeRoute', leetCodeRoute);
router.use('/codeForcesRoute', codeForcesRoute);
router.use('/auth', authRoute)
router.use('/email', emailRoute)

export default router;