import { Request, Response } from 'express';
import { generateBlogContent } from '../services/aiService';
import prisma from '../database/db';

export const generateAiBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { topic, tone } = req.body;
    
    if (!topic) {
      res.status(400).json({ success: false, message: 'Topic is required' });
      return;
    }

    const content = await generateBlogContent(topic, tone);
    
    res.json({ success: true, content });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to generate AI blog' });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { slug }
    });
    
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }
    
    res.json({ success: true, blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogData = req.body;
    
    const blog = await prisma.blog.create({
      data: blogData
    });
    
    res.status(201).json({ success: true, blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to create blog', error: error.message });
  }
};
