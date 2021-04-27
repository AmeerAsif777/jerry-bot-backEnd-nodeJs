import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost, createPostComment, updatePostComment, deletePostComment} from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getPosts);
router.post('/',auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
//Comments
router.post('/:id/postComment', auth, createPostComment);
router.patch('/:id/postComment', auth, updatePostComment);
router.delete('/:postId/comment/:commentId', auth, deletePostComment);

export default router;