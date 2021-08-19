import express from 'express';

import { signin,signup } from '../controllers/user.js'

const router = express.Router();

// user endpoints and their controllers
router.post('/signin', signin)
router.post('/signup', signup)


export default router;