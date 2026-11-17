import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ShieldCheck, 
  Send, 
  Tag, 
  HelpCircle,
  PlusCircle
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#172138] border border-[#2C3B64] p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C3B64] text-[#F2C368] border border-[#F2C368]/30 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>TNPSC Peer Learning & Doubt Clearing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Community Discussion Forum
          </h2>
          <p className="text-xs text-[#A9A4C9]">
            Ask challenging question doubts, discuss Samacheer references, and learn alongside fellow Tamil Nadu government service aspirants.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="self-start sm:self-center px-4 py-2.5 rounded-2xl text-xs font-bold text-[#101626] bg-[#F2C368] hover:bg-[#e4b557] flex items-center gap-2 shadow-lg shadow-[#F2C368]/20 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ask a Doubt</span>
        </button>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <form onSubmit={handleCreatePost} className="glass-card rounded-3xl p-6 border-[#F2C368]/40 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#F2C368]" />
              <span>Post New Question or Study Query</span>
            </h3>
            <button 
              type="button" 
              onClick={() => setShowNewPostForm(false)}
              className="text-xs text-[#A9A4C9] hover:text-white"
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
              className="w-full px-4 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-sm text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368] font-tamil"
              required
            />

            <textarea
              placeholder="Describe your doubt in detail or cite the question and your reasoning..."
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-sm text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368] font-tamil"
              required
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#A9A4C9]">
                <Tag className="w-3.5 h-3.5" />
                <span>Tag:</span>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="bg-[#101626] border border-[#2C3B64] text-xs text-slate-200 rounded-lg px-2 py-1"
                >
                  {tagsList.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-[#101626] bg-[#F2C368] hover:bg-[#e4b557]"
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
            className="glass-card rounded-3xl p-6 border-[#2C3B64] space-y-4 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#101626] border border-[#2C3B64] text-[#F2C368] font-bold text-xs flex items-center justify-center">
                  {disc.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{disc.author}</span>
                    <span className={`text-[10px] px-2 py-0.2 rounded-full border font-mono ${
                      disc.role === 'Admin' 
                        ? 'bg-[#942F67]/25 text-[#f38ac3] border-[#942F67]/50' 
                        : 'bg-[#86947A]/25 text-[#b7c7ab] border-[#86947A]/50'
                    }`}>
                      {disc.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#A9A4C9]">{disc.timeAgo}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {disc.tags.map((tg, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#101626] text-[#A9A4C9] border border-[#2C3B64]">
                    {tg}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-tamil leading-snug">
                {disc.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-tamil">
                {disc.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#2C3B64] text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleUpvote(disc.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold border transition-all ${
                    disc.isUpvoted
                      ? 'bg-[#942F67]/25 text-[#f38ac3] border-[#942F67]'
                      : 'bg-[#101626] text-[#A9A4C9] border-[#2C3B64] hover:text-white'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${disc.isUpvoted ? 'fill-[#f38ac3]' : ''}`} />
                  <span>{disc.upvotes} Upvotes</span>
                </button>

                <button
                  onClick={() => setActiveReplyId(activeReplyId === disc.id ? null : disc.id)}
                  className="text-[#A9A4C9] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#2C3B64]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{disc.replies.length} Replies</span>
                </button>
              </div>

              <span className="text-[11px] text-[#A9A4C9]/70 font-mono">
                {disc.targetExam}
              </span>
            </div>

            {disc.replies.length > 0 && (
              <div className="space-y-2.5 pt-2 pl-4 border-l-2 border-[#2C3B64]">
                {disc.replies.map((rep) => (
                  <div key={rep.id} className="p-3.5 rounded-2xl bg-[#101626]/80 border border-[#2C3B64] space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{rep.author}</span>
                        {rep.verified && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#86947A]/25 text-[#b7c7ab] border border-[#86947A]/50 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-[#86947A]" />
                            <span>Verified Faculty</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#A9A4C9]">{rep.timeAgo}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-tamil">
                      {rep.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeReplyId === disc.id && (
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Write an encouraging response or correct answer explanation..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddReply(disc.id)}
                  className="flex-1 px-4 py-2 rounded-xl bg-[#101626] border border-[#2C3B64] text-xs text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368] font-tamil"
                />
                <button
                  onClick={() => handleAddReply(disc.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F2C368] hover:bg-[#e4b557] text-[#101626] flex items-center gap-1"
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
