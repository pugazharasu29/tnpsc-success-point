import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ShieldCheck, 
  Send, 
  Tag, 
  User, 
  HelpCircle,
  PlusCircle,
  CheckCircle2
} from 'lucide-react';
import { initialDiscussions } from '../data/communityDiscussions';

const CommunityForum = ({ userRole }) => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('#பொதுத்தமிழ்');
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const tagsList = ['#பொதுத்தமிழ்', '#திருக்குறள்', '#Aptitude', '#Unit8', '#Unit9', '#Group4', '#Group2'];

  const handleUpvote = (discId) => {
    setDiscussions(prev => prev.map(d => {
      if (d.id === discId) {
        return {
          ...d,
          isUpvoted: !d.isUpvoted,
          upvotes: d.isUpvoted ? d.upvotes - 1 : d.upvotes + 1
        };
      }
      return d;
    }));
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      id: `disc-${Date.now()}`,
      author: userRole === 'admin' ? 'Dr. K. Ramanathan (Faculty)' : 'Pugazharasu (Aspirant)',
      avatar: userRole === 'admin' ? 'KR' : 'PA',
      role: userRole === 'admin' ? 'Admin' : 'Aspirant',
      targetExam: 'Group 4 & VAO',
      timeAgo: 'Just now',
      title: newTitle,
      content: newContent,
      tags: [newTag],
      upvotes: 1,
      isUpvoted: true,
      replies: []
    };

    setDiscussions([newPost, ...discussions]);
    setNewTitle('');
    setNewContent('');
    setShowNewPostForm(false);
  };

  const handleAddReply = (discId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: userRole === 'admin' ? 'Staff Desk' : 'You (Aspirant)',
      avatar: userRole === 'admin' ? 'SD' : 'ME',
      role: userRole === 'admin' ? 'Faculty' : 'Aspirant',
      verified: userRole === 'admin',
      timeAgo: 'Just now',
      content: replyText
    };

    setDiscussions(prev => prev.map(d => {
      if (d.id === discId) {
        return {
          ...d,
          replies: [...d.replies, newReply]
        };
      }
      return d;
    }));

    setReplyText('');
    setActiveReplyId(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 text-purple-300 border border-purple-800/60 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>TNPSC Peer Learning & Doubt Clearing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Community Discussion Forum
          </h2>
          <p className="text-xs text-slate-300">
            Ask challenging question doubts, discuss Samacheer references, and learn alongside fellow Tamil Nadu government service aspirants.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="self-start sm:self-center px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ask a Doubt</span>
        </button>
      </div>

      {/* New Post Form Modal/Card */}
      {showNewPostForm && (
        <form onSubmit={handleCreatePost} className="glass-card rounded-3xl p-6 border border-emerald-500/40 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Post New Question or Study Query</span>
            </h3>
            <button 
              type="button" 
              onClick={() => setShowNewPostForm(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Question headline / Title (e.g. சிலப்பதிகாரத்தில் வரும் காதைகள் எண்ணிக்கை?)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-tamil"
              required
            />

            <textarea
              placeholder="Describe your doubt in detail or cite the question and your reasoning..."
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-tamil"
              required
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Tag className="w-3.5 h-3.5" />
                <span>Tag:</span>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2 py-1"
                >
                  {tagsList.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300"
              >
                Publish Doubt
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Discussions Feed */}
      <div className="space-y-5">
        {discussions.map((disc) => (
          <div 
            key={disc.id}
            className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4 transition-all"
          >
            {/* Author & Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center">
                  {disc.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{disc.author}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded-full border font-mono ${
                      disc.role === 'Admin' 
                        ? 'bg-amber-950 text-amber-300 border-amber-800' 
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {disc.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{disc.timeAgo}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {disc.tags.map((tg, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-cyan-300 border border-slate-800">
                    {tg}
                  </span>
                ))}
              </div>
            </div>

            {/* Title & Body */}
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-tamil leading-snug">
                {disc.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-tamil">
                {disc.content}
              </p>
            </div>

            {/* Action Bar (Upvote & Reply Button) */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpvote(disc.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border transition-all ${
                    disc.isUpvoted
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${disc.isUpvoted ? 'fill-emerald-400' : ''}`} />
                  <span>{disc.upvotes} Upvotes</span>
                </button>

                <button
                  onClick={() => setActiveReplyId(activeReplyId === disc.id ? null : disc.id)}
                  className="text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{disc.replies.length} Replies</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-500 font-mono">
                {disc.targetExam}
              </span>
            </div>

            {/* Nested Replies Section */}
            {disc.replies.length > 0 && (
              <div className="space-y-2.5 pt-2 pl-4 border-l-2 border-slate-800">
                {disc.replies.map((rep) => (
                  <div key={rep.id} className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{rep.author}</span>
                        {rep.verified && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-cyan-400" />
                            <span>Verified Faculty</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500">{rep.timeAgo}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-tamil">
                      {rep.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            {activeReplyId === disc.id && (
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Write an encouraging response or correct answer explanation..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddReply(disc.id)}
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 font-tamil"
                />
                <button
                  onClick={() => handleAddReply(disc.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};

export default CommunityForum;
