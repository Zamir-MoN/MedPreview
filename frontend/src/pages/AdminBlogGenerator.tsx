import { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Save, X, Edit3, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminBlogGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional and informative');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState('');
  const [blogMeta, setBlogMeta] = useState({ title: '', category: '', author: 'Dr. Jonathan', readTime: '5 min' });
  const [publishStatus, setPublishStatus] = useState({ loading: false, success: false, error: '' });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    
    setLoading(true);
    setProgress(0);
    setGeneratedContent('');
    setPublishStatus({ loading: false, success: false, error: '' });

    // Progress bar simulation (approximating 60-120s generation time)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) return 98;
        const increment = prev < 50 ? 5 : prev < 80 ? 1 : 0.2;
        return prev + increment;
      });
    }, 1000);

    try {
      const response = await axios.post('/api/blogs/generate-ai', {
        topic,
        tone
      });
      
      if (response.data.success) {
        setGeneratedContent(response.data.content);
        // Auto-fill title based on topic
        setBlogMeta({ ...blogMeta, title: topic.charAt(0).toUpperCase() + topic.slice(1) });
      }
    } catch (error: any) {
      alert('Failed to generate AI content. Please try again.');
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handlePublish = async () => {
    if (!generatedContent || !blogMeta.title || !blogMeta.category) {
      alert('Please fill in title and category before publishing.');
      return;
    }

    setPublishStatus({ loading: true, success: false, error: '' });

    try {
      const slug = blogMeta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const description = generatedContent.substring(0, 150) + '...';

      await axios.post('/api/blogs', {
        title: blogMeta.title,
        slug,
        category: blogMeta.category,
        description,
        author: blogMeta.author,
        readTime: blogMeta.readTime,
        content: generatedContent,
        status: 'PUBLISHED'
      });
      
      setPublishStatus({ loading: false, success: true, error: '' });
      setTimeout(() => {
        setGeneratedContent('');
        setTopic('');
        setBlogMeta({ title: '', category: '', author: 'Dr. Jonathan', readTime: '5 min' });
        setPublishStatus({ loading: false, success: false, error: '' });
      }, 3000);
    } catch (error: any) {
      setPublishStatus({ loading: false, success: false, error: 'Failed to publish blog.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Admin - AI Blog Generator</title>
      </Helmet>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-6">
            <Link to="/admin/blogs" className="text-gray-500 font-medium hover:text-primary transition-colors">Manage Blogs</Link>
            <Link to="/admin/ai-generator" className="text-primary font-bold px-4 py-2 bg-blue-50 rounded-xl">AI Generator</Link>
          </div>
          <Link to="/admin/blogs" className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:-translate-y-1 transition-all flex items-center gap-2">
            <FileText className="w-4 h-4" /> View All Blogs
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="bg-primary/10 p-3 rounded-2xl"><Sparkles className="text-primary w-8 h-8" /></div>
          <div>
            <h1 className="text-3xl font-bold text-dark">AI Blog Generator</h1>
            <p className="text-gray-500">Powered by MedEngine AI</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-dark mb-4 text-lg">Generation Settings</h3>
              <form onSubmit={handleGenerate}>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Topic / Subject *</label>
                  <input required value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Type 2 Diabetes Management" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tone</label>
                  <select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    <option value="Professional and informative">Professional</option>
                    <option value="Empathetic and caring">Empathetic</option>
                    <option value="Simple and conversational">Conversational</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Sparkles className="w-5 h-5" /> Generate Draft</>}
                </button>
              </form>
            </div>

            {loading && (
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl text-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-primary font-medium text-sm mb-4">MedEngine AI is generating your content...</p>
                <div className="w-full bg-blue-200/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.round(progress)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-500 mt-2 font-bold">{Math.round(progress)}%</p>
              </div>
            )}
          </div>

          {/* Editor/Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[600px] overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <Edit3 className="w-5 h-5" /> Editor & Preview
                </div>
                <button 
                  onClick={handlePublish}
                  disabled={!generatedContent || publishStatus.loading}
                  className="bg-accent text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-cyan-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {publishStatus.loading ? 'Publishing...' : <><Save className="w-4 h-4" /> Publish Blog</>}
                </button>
              </div>

              {publishStatus.success && (
                <div className="m-4 bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex justify-between items-center">
                  Blog published successfully!
                  <button onClick={() => setPublishStatus({ ...publishStatus, success: false })}><X className="w-5 h-5" /></button>
                </div>
              )}
              {publishStatus.error && (
                <div className="m-4 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
                  {publishStatus.error}
                </div>
              )}

              {generatedContent ? (
                <div className="p-6 flex-grow flex flex-col gap-4 overflow-y-auto">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Title</label>
                      <input value={blogMeta.title} onChange={e => setBlogMeta({...blogMeta, title: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm font-bold text-dark" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Category</label>
                      <input placeholder="e.g. Nutrition" value={blogMeta.category} onChange={e => setBlogMeta({...blogMeta, category: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm" />
                    </div>
                  </div>
                  <hr className="border-gray-100 my-2" />
                  
                  {generatedContent && generatedContent.match(/!\[.*?\]\((.*?)\)/) && (
                    <div className="mt-2">
                      <label className="block text-xs font-bold text-gray-500 mb-2">Generated Image Preview</label>
                      <img 
                        src={generatedContent.match(/!\[.*?\]\((.*?)\)/)![1]} 
                        alt="Blog Cover" 
                        className="w-full max-h-48 object-cover rounded-xl border border-gray-200"
                      />
                    </div>
                  )}

                  <textarea 
                    data-lenis-prevent
                    value={generatedContent}
                    onChange={e => setGeneratedContent(e.target.value)}
                    className="w-full flex-grow p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-gray-700 font-mono resize-none min-h-[400px]"
                  />
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-gray-400 p-10 text-center">
                  <Sparkles className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">Use the controls on the left to generate an AI-powered medical blog article.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
