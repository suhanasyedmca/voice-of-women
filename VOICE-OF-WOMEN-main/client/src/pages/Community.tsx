import { useState } from 'react';
import { MessageCircle, Heart, Share2, MoreHorizontal, Image as ImageIcon } from 'lucide-react';

export default function Community() {
  const [posts] = useState([
    {
      id: 1,
      author: 'Ananya S.',
      avatar: 'A',
      category: 'Education',
      time: '2 hours ago',
      content: 'Just successfully applied for the AICTE scholarship through the VOW tracker! Thank you to this community for the mentorship. Let me know if anyone needs help with the docs.',
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      author: 'Anonymous User',
      avatar: '?',
      category: 'Safety',
      time: '6 hours ago',
      content: 'Can someone explain how the zero FIR works? The legal rights guide says I can file it anywhere, but the local station hesitated.',
      likes: 112,
      comments: 34
    }
  ]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 pb-32">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Community Forum</h1>
          <p className="text-gray-600 dark:text-gray-400">A safe space to share, ask, and support.</p>
        </div>
      </div>

      {/* Create Post */}
      <div className="card p-4 space-y-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-heading">Me</div>
          <textarea 
            placeholder="Share an achievement, ask a question, or post anonymously..."
            className="w-full bg-transparent border-none focus:ring-0 resize-none h-16 pt-2 text-gray-800 dark:text-gray-200 outline-none"
          ></textarea>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-primary flex items-center gap-1 text-sm font-medium"><ImageIcon size={18}/> Photo</button>
            <button className="text-gray-500 hover:text-primary flex items-center gap-1 text-sm font-medium">Anonymous</button>
          </div>
          <button className="btn-primary py-1.5 px-6 text-sm">Post</button>
        </div>
      </div>

      {/* Feed Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Safety 🛡️', 'Education 📚', 'Economy 💼', 'Healthcare 🏥'].map((f,id) => (
           <button key={id} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${id === 0 ? 'bg-primary text-white' : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>
             {f}
           </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="card p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-light text-secondary-dark flex items-center justify-center font-bold">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{post.author}</h4>
                  <p className="text-xs text-gray-500">{post.time} • <span className="text-primary font-medium">{post.category}</span></p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20}/></button>
            </div>
            
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
              {post.content}
            </p>
            
            <div className="flex gap-6 pt-3 border-t border-gray-100 dark:border-gray-800">
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium">
                <Heart size={18} /> {post.likes}
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors text-sm font-medium">
                <MessageCircle size={18} /> {post.comments}
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors text-sm font-medium">
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
