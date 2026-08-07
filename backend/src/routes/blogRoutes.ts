import { Router } from 'express';
import { generateAiBlog, getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, generateImageForBlog } from '../controllers/blogController';

const router = Router();

router.post('/generate-ai', generateAiBlog);
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.post('/:id/generate-image', generateImageForBlog);

export default router;
