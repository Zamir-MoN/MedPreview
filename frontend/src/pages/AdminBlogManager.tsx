import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Edit3, Trash2, Eye, EyeOff, Plus, FileText, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminBlogManager() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Edit modal state
  const [editingBlog, setEditingBlog] = useState<any | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  const toggleStatus = async (blog: any) => {
    const newStatus = blog.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await axios.put(`/api/blogs/${blog.id}`, { status: newStatus });
      setBlogs(blogs.map(b => b.id === blog.id ? { ...b, status: newStatus } : b));
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog? This cannot be undone.')) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error) {
      alert('Failed to delete blog');
    }
  };

  const saveEdit = async () => {
    if (!editingBlog) return;
    try {
      await axios.put(`/api/blogs/${editingBlog.id}`, {
        title: editingBlog.title,
        category: editingBlog.category,
        content: editingBlog.content
      });
      setBlogs(blogs.map(b => b.id === editingBlog.id ? editingBlog : b));
      setEditingBlog(null);
    } catch (error) {
      alert('Failed to save changes');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <Helmet>
        <title>Manage Blogs | Premium Medical</title>
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-6">
            <Link to="/admin/blogs" className="text-primary font-bold px-4 py-2 bg-blue-50 rounded-xl">Manage Blogs</Link>
            <Link to="/admin/ai-generator" className="text-gray-500 font-medium hover:text-primary transition-colors">AI Generator</Link>
          </div>
          <Link to="/admin/ai-generator" className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:-translate-y-1 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Blog
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" /> Blog Manager
          </h1>
          <p className="text-gray-500 mt-2">Manage your published articles and drafts.</p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                  <tr>
                    <th className="p-4 font-medium">Title</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">No blogs found.</td>
                    </tr>
                  ) : blogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-dark">{blog.title}</div>
                        <div className="text-xs text-gray-400 max-w-xs truncate">{blog.slug}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{blog.category}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          blog.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => toggleStatus(blog)}
                            title={blog.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                            className={`p-2 rounded-lg transition-colors ${
                              blog.status === 'PUBLISHED' ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'
                            }`}
                          >
                            {blog.status === 'PUBLISHED' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => setEditingBlog(blog)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteBlog(blog.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-dark">Edit Blog</h2>
              <button onClick={() => setEditingBlog(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Title</label>
                  <input 
                    value={editingBlog.title} 
                    onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} 
                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-dark focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Category</label>
                  <input 
                    value={editingBlog.category} 
                    onChange={e => setEditingBlog({...editingBlog, category: e.target.value})} 
                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>
              </div>
              
              <div className="flex-grow flex flex-col mt-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">Content (Markdown)</label>
                <textarea 
                  value={editingBlog.content}
                  onChange={e => setEditingBlog({...editingBlog, content: e.target.value})}
                  className="w-full flex-grow min-h-[300px] p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-gray-700 font-mono resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setEditingBlog(null)}
                className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit}
                className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-md shadow-primary/20 hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
