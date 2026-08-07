import { Router } from 'express';
import { generateAiBlog, getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';

const router = Router();

router.post('/generate-ai', generateAiBlog);
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
