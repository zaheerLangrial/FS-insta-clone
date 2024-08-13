import express from 'express';
import { followOrUnFollow, getProfile, getSuggestionUsers, login, logout, Register } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';


const router = express.Router();

router.route('/register').post(Register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/suggested').get(isAuthenticated, getSuggestionUsers);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnFollow);

export default router;
