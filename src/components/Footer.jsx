import React from 'react';
import { GraduationCap, ExternalLink, Heart, ShieldAlert } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#070a12]/90 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-bold text-white text-base">
                TNPSC <span className="text-emerald-400">SuccessPoint</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-tamil">
              தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம் (TNPSC) குரூப் 1, குரூப் 2, மற்றும் குரூப் 4 தேர்வுகளுக்குத் தயாராகும் மாணவர்களுக்கான முழுமையான இணையக் கற்றல் தளம்.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Designed & Engineered with ❤️ by <strong>Pugazharasu A. (TINT Solutions)</strong>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><span className="hover:text-emerald-400 cursor-pointer">Group 4 & VAO Mock Tests</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Tamil Literature (இலக்கியம்)</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Aptitude Shortcut Vault</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Unit 8 & Unit 9 Notes</span></li>
            </ul>
          </div>

          {/* Official Resources */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Official Links
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a 
                  href="https://www.tnpsc.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1"
                >
                  <span>TNPSC Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://textbookcorp.tn.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-cyan-400 flex items-center gap-1"
                >
                  <span>Samacheer Kalvi E-Books</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} TNPSC SuccessPoint. Free educational preparation platform for civil service aspirants.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>All mock content aligned with latest TNPSC syllabus</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
