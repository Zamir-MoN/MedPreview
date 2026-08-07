import { Router } from 'express';
import { generateAiBlog, getBlogs, getBlogBySlug, createBlog } from '../controllers/blogController';

const router = Router();

router.post('/generate-ai', generateAiBlog);
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', createBlog);

export default router;
