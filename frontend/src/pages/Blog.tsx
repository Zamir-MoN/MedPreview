import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { animateFadeUp } from '../animations/gsap';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogType {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  category: string;
  description: string;
  content?: string;
  readTime: string;
  createdAt: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blogs from API
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        if (response.data.success) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => animateFadeUp('.fade-up-item', 0.1), 100);
    }
  }, [loading]);

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <Helmet>
        <title>Medical Blog | Dr. Jonathan</title>
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 fade-up-item">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Medical <span className="text-gradient">Insights</span></h1>
          <p className="text-gray-600 text-lg">Expert advice, health tips, and the latest medical news directly from Dr. Jonathan.</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col animate-pulse">
                {/* Image Skeleton */}
                <div className="h-48 bg-gray-200/60 relative">
                  <div className="absolute top-4 left-4 bg-gray-300/60 w-16 h-6 rounded-full"></div>
                </div>
                
                {/* Content Skeleton */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta Skeleton */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-3 bg-gray-200/60 rounded"></div>
                    <div className="w-16 h-3 bg-gray-200/60 rounded"></div>
                  </div>
                  
                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-200/60 rounded w-3/4 mb-4"></div>
                  
                  {/* Description Skeleton */}
                  <div className="space-y-2 mb-8">
                    <div className="h-3 bg-gray-200/60 rounded w-full"></div>
                    <div className="h-3 bg-gray-200/60 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200/60 rounded w-4/6"></div>
                  </div>
                  
                  {/* Button Skeleton */}
                  <div className="mt-auto w-24 h-4 bg-gray-200/60 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 text-lg">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const imgMatch = blog.content?.match(/!\[[^\]]*\]\(([^)]+)\)/);
              const displayImage = blog.coverImage || (imgMatch ? imgMatch[1].trim() : null);

              return (
              <div key={blog.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 fade-up-item group flex flex-col">
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                  {displayImage ? (
                    <img src={displayImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-primary font-bold text-2xl">
                      {blog.category}
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {blog.description?.replace(/!\[[^\]]*\]\(([^)]+)\)\s*/g, '').replace(/#+\s*/g, '')}
                  </p>
                  
                  <Link to={`/blog/${blog.slug}`} className="mt-auto flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors group/link">
                    Read Article <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
