import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { addComment, addNewPost, bookmarkPost, deletePost, DisLikePost, getAllPosts, getCommentsOfPost, getUserPosts, likePost } from '../controllers/post.controller.js';


const router = express.Router();

router.route('/addpost').post(isAuthenticated, addNewPost);
router.route('/all').get(isAuthenticated, getAllPosts);
router.route('/userpost/all').get(isAuthenticated, getUserPosts)
router.route('/:id/like').get(isAuthenticated, likePost);
router.route('/:id/dislike').get(isAuthenticated, DisLikePost)
router.route('/:id/comment').post(isAuthenticated, addComment);
router.route('/:id/comment/all').get(isAuthenticated, getCommentsOfPost);
router.route('/delete/:id').post(isAuthenticated, deletePost);
router.route('/:id/bookmark').post(isAuthenticated, bookmarkPost);

export default router