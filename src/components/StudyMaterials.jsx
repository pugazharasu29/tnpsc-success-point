import React, { useState } from 'react';
import { 
  DownloadCloud, 
  FileText, 
  Star, 
  Search, 
  Filter, 
  CheckCircle2, 
  BookOpen, 
  ExternalLink,
  Sparkles,
  ArrowDownToLine
} from 'lucide-react';
import { studyMaterials } from '../data/studyMaterials';

const StudyMaterials = () => {
  const [materialsList, setMaterialsList] = useState(studyMaterials);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(null);

  const categories = ['All', 'General Tamil', 'General Studies', 'Aptitude', 'PYQ Papers', 'Unit 9 (TN Admin)', 'General Science'];

  const filteredMaterials = materialsList.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSimulatedDownload = (item) => {
    setDownloadingId(item.id);
    
    setTimeout(() => {
      setDownloadingId(null);
      // Increment downloads count locally
      setMaterialsList(prev => prev.map(m => m.id === item.id ? { ...m, downloads: m.downloads + 1 } : m));
      setDownloadSuccessToast(item.title);
      setTimeout(() => setDownloadSuccessToast(null), 3500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 text-cyan-400 border border-cyan-800/60 text-xs font-semibold">
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>Digital Study Hub & Question Archives</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Curated TNPSC Study Materials
          </h2>
          <p className="text-xs text-slate-300">
            Download hand-crafted revision guides, Samacheer Kalvi summaries, and verified Previous Year Question Papers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400">Total Available Downloads:</span>
            <div className="text-sm font-mono font-bold text-emerald-400">75,000+ Aspirant Copies</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes by subject, topic or keywords (e.g. திருக்குறள், Laxmikanth, Aptitude)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-tamil"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Download Success Toast */}
      {downloadSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 shadow-xl">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Download Initiated: <strong className="text-white font-tamil">{downloadSuccessToast}</strong></span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded">PDF Ready</span>
        </div>
      )}

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((item) => {
          const isDownloading = downloadingId === item.id;

          return (
            <div 
              key={item.id}
              className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col justify-between group hover:border-cyan-500/40 transition-all duration-300"
            >
              <div>
                {/* Card Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-tamil leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4 font-tamil">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((t, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Metadata & Download CTA */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <div>{item.size} • {item.pages} Pages</div>
                  <div className="text-slate-500 font-mono">{item.downloads.toLocaleString()} Downloads</div>
                </div>

                <button
                  onClick={() => handleSimulatedDownload(item)}
                  disabled={isDownloading}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isDownloading
                      ? 'bg-slate-800 text-slate-400 cursor-wait'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  <ArrowDownToLine className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
                  <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default StudyMaterials;
