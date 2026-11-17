import React, { useState } from 'react';
import { 
  DownloadCloud, 
  Star, 
  Search, 
  CheckCircle2, 
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
      setMaterialsList(prev => prev.map(m => m.id === item.id ? { ...m, downloads: m.downloads + 1 } : m));
      setDownloadSuccessToast(item.title);
      setTimeout(() => setDownloadSuccessToast(null), 3500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#172138] border border-[#2C3B64] p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C3B64] text-[#F2C368] border border-[#F2C368]/30 text-xs font-semibold">
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>Digital Study Hub & Question Archives</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Curated TNPSC Study Materials
          </h2>
          <p className="text-xs text-[#A9A4C9]">
            Download hand-crafted revision guides, Samacheer Kalvi summaries, and verified Previous Year Question Papers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-[#A9A4C9]">Total Available Downloads:</span>
            <div className="text-sm font-mono font-bold text-[#F2C368]">75,000+ Aspirant Copies</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9A4C9]" />
          <input
            type="text"
            placeholder="Search notes by subject, topic or keywords (e.g. திருக்குறள், Laxmikanth, Aptitude)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#172138] border border-[#2C3B64] text-sm text-slate-200 placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368] transition-all font-tamil"
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
                  ? 'bg-[#F2C368] text-[#101626] border-[#F2C368] font-bold shadow-md shadow-[#F2C368]/20'
                  : 'bg-[#101626] text-[#A9A4C9] border-[#2C3B64] hover:text-white hover:bg-[#2C3B64]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Download Success Toast */}
      {downloadSuccessToast && (
        <div className="p-4 rounded-2xl bg-[#86947A]/30 border border-[#86947A] text-[#b7c7ab] text-xs flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 shadow-xl">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#86947A] shrink-0" />
            <span>Download Initiated: <strong className="text-white font-tamil">{downloadSuccessToast}</strong></span>
          </div>
          <span className="text-[10px] font-mono text-[#F2C368] bg-[#101626] px-2 py-0.5 rounded border border-[#2C3B64]">PDF Ready</span>
        </div>
      )}

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((item) => {
          const isDownloading = downloadingId === item.id;

          return (
            <div 
              key={item.id}
              className="glass-card rounded-3xl p-6 border-[#2C3B64] flex flex-col justify-between group hover:border-[#F2C368]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#942F67]/20 text-[#f38ac3] border border-[#942F67]/40">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[#F2C368] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#F2C368]" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#F2C368] transition-colors font-tamil leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#A9A4C9] line-clamp-3 leading-relaxed mb-4 font-tamil">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((t, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#101626] text-[#A9A4C9] border border-[#2C3B64]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#2C3B64] flex items-center justify-between gap-3">
                <div className="text-[11px] text-[#A9A4C9] space-y-0.5">
                  <div>{item.size} • {item.pages} Pages</div>
                  <div className="text-[#A9A4C9]/70 font-mono">{item.downloads.toLocaleString()} Downloads</div>
                </div>

                <button
                  onClick={() => handleSimulatedDownload(item)}
                  disabled={isDownloading}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isDownloading
                      ? 'bg-[#172138] text-[#A9A4C9] cursor-wait'
                      : 'bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67] hover:opacity-95 text-[#101626] shadow-md shadow-[#F2C368]/20'
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
