import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { animateFadeUp } from '../animations/gsap';

interface BlogType {
  title: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
  createdAt: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${slug}`);
        if (response.data.success) {
          setBlog(response.data.blog);
        }
      } catch (error) {
        console.error('Failed to fetch blog', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (!loading && blog) {
      setTimeout(() => animateFadeUp('.fade-up-item', 0.1), 100);
    }
  }, [loading, blog]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center min-h-[60vh] items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-dark mb-4">Article Not Found</h2>
        <Link to="/blog" className="text-primary font-bold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-20">
      <Helmet>
        <title>{blog.title} | Dr. Jonathan</title>
      </Helmet>

      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors mb-8 fade-up-item">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="mb-10 fade-up-item">
          <div className="flex gap-2 mb-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {blog.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {blog.readTime}</span>
          </div>
        </div>

        {/* Content rendering using dangerouslySetInnerHTML because it's rich HTML/Markdown converted */}
        <div 
          className="prose prose-lg prose-blue max-w-none fade-up-item prose-headings:text-dark prose-p:text-gray-600 prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} // Simple br replacement for markdown-like text, would ideally use a markdown parser if raw text
        />
      </div>
    </div>
  );
}
