import { Request, Response } from 'express';
import { generateBlogContent, generateImageForExistingBlog } from '../services/aiService';
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
    const slug = req.params.slug as string;
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

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const updateData = req.body;
    
    const blog = await prisma.blog.update({
      where: { id },
      data: updateData
    });
    
    res.json({ success: true, blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to update blog', error: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    
    await prisma.blog.delete({
      where: { id }
    });
    
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to delete blog', error: error.message });
  }
};

export const generateImageForBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    
    const blog = await prisma.blog.findUnique({
      where: { id }
    });
    
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    const updatedContent = await generateImageForExistingBlog(blog.title, blog.content);
    
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: { content: updatedContent }
    });
    
    res.json({ success: true, blog: updatedBlog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to generate image', error: error.message });
  }
};
