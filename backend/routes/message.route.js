import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getMessage, sandMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.route('/sand/:id').post(isAuthenticated, sandMessage);
router.route('/all/:id').get(isAuthenticated, getMessage);

export default router