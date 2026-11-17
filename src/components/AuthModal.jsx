import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  GraduationCap, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  LogIn 
} from 'lucide-react';

const TN_DISTRICTS = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", 
  "Tirunelveli", "Erode", "Vellore", "Thanjavur", "Dindigul", 
  "Kanchipuram", "Cuddalore", "Virudhunagar", "Sivagangai", "Other District"
];

const AuthModal = ({ isOpen, onClose, onLoginSuccess, currentRole, setUserRole }) => {
  const [authMode, setAuthMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetExam, setTargetExam] = useState('Group 4 & VAO');
  const [district, setDistrict] = useState('Chennai');
  const [password, setPassword] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  if (!isOpen) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    const userData = {
      name: signInEmail.split('@')[0] || 'Aspirant',
      email: signInEmail,
      phone: '+91 98765 43210',
      targetExam: 'Group 4 & VAO',
      district: 'Chennai',
      role: 'aspirant',
      joinedDate: 'Joined Nov 2026',
      testsAttempted: 3,
      rank: 'State Rank #412'
    };

    setSuccessToast(`Welcome back, ${userData.name}!`);
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
    }, 800);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('Please fill in all mandatory fields.');
      return;
    }

    const userData = {
      name,
      email,
      phone: phone || '+91 98765 00000',
      targetExam,
      district,
      role: 'aspirant',
      joinedDate: 'Joined Today',
      testsAttempted: 0,
      rank: 'Aspirant Cadet'
    };

    setSuccessToast(`Account created successfully for ${name}!`);
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
    }, 800);
  };

  const handleQuickDemoAspirant = () => {
    const demoUser = {
      name: 'Pugazharasu A.',
      email: 'pugazh.aspirant@tnpsc.dev',
      phone: '+91 98765 43210',
      targetExam: 'Group 4 & VAO',
      district: 'Chennai',
      role: 'aspirant',
      joinedDate: 'Active Member',
      testsAttempted: 5,
      rank: 'Top 5% Aspirant'
    };
    setUserRole('aspirant');
    setSuccessToast('Signed in as Aspirant Pugazharasu!');
    setTimeout(() => {
      onLoginSuccess(demoUser);
      onClose();
    }, 600);
  };

  const handleQuickDemoFaculty = () => {
    const demoAdmin = {
      name: 'Dr. K. Ramanathan',
      email: 'ramanathan.faculty@tnpsc.dev',
      phone: '+91 94440 12345',
      targetExam: 'All TNPSC Exams',
      district: 'Madurai',
      role: 'admin',
      joinedDate: 'Senior Faculty',
      testsAttempted: 24,
      rank: 'Chief Evaluator'
    };
    setUserRole('admin');
    setSuccessToast('Signed in as Faculty Admin!');
    setTimeout(() => {
      onLoginSuccess(demoAdmin);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#2C3B64] relative shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#A9A4C9] hover:text-white bg-[#101626] border border-[#2C3B64] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Brand Header */}
        <div className="space-y-1.5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F2C368] via-[#DD8F6B] to-[#942F67] p-0.5 mx-auto shadow-lg shadow-[#F2C368]/20">
            <div className="w-full h-full bg-[#101626] rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#F2C368]" />
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            {authMode === 'signin' ? 'Aspirant Sign In' : 'Join TNPSC SuccessPoint'}
          </h2>
          <p className="text-xs text-[#A9A4C9] font-tamil">
            தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையத் தேர்வுகளுக்கான கற்றல் தளம்
          </p>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="p-3 rounded-xl bg-[#86947A]/30 border border-[#86947A] text-[#b7c7ab] text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#86947A] shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#942F67]/30 border border-[#942F67] text-[#f38ac3] text-xs">
            {errorMsg}
          </div>
        )}

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 gap-1.5 bg-[#101626] p-1 rounded-2xl border border-[#2C3B64] text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'signin' 
                ? 'bg-[#F2C368] text-[#101626] font-bold shadow-md shadow-[#F2C368]/20' 
                : 'text-[#A9A4C9] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'signup' 
                ? 'bg-[#F2C368] text-[#101626] font-bold shadow-md shadow-[#F2C368]/20' 
                : 'text-[#A9A4C9] hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1-Click Demo Login Bar */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase text-[#A9A4C9]/70 text-center tracking-wider">
            Quick 1-Click Access
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickDemoAspirant}
              className="p-2.5 rounded-xl bg-[#101626] hover:bg-[#172138] border border-[#86947A]/40 text-[11px] text-[#b7c7ab] font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <User className="w-3.5 h-3.5 text-[#86947A]" />
              <span>Demo Aspirant</span>
            </button>
            <button
              type="button"
              onClick={handleQuickDemoFaculty}
              className="p-2.5 rounded-xl bg-[#101626] hover:bg-[#172138] border border-[#942F67]/40 text-[11px] text-[#f38ac3] font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#942F67]" />
              <span>Demo Faculty</span>
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#2C3B64]"></div>
          <span className="flex-shrink mx-3 text-[10px] text-[#A9A4C9]/70 font-mono">OR USE CREDENTIALS</span>
          <div className="flex-grow border-t border-[#2C3B64]"></div>
        </div>

        {/* SIGN IN FORM */}
        {authMode === 'signin' ? (
          <form onSubmit={handleSignIn} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Email or Mobile</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9A4C9]" />
                <input
                  type="text"
                  placeholder="e.g. aspirant@tnpsc.dev"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9A4C9]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A9A4C9] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#A9A4C9] pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-[#2C3B64] text-[#F2C368]" />
                <span>Remember me</span>
              </label>
              <span className="text-[#F2C368] hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67] hover:opacity-95 text-[#101626] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#F2C368]/20 transition-all mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Aspirant Portal</span>
            </button>
          </form>
        ) : (
          /* SIGN UP FORM */
          <form onSubmit={handleSignUp} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9A4C9]" />
                <input
                  type="text"
                  placeholder="e.g. Pugazharasu A."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368]"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Target TNPSC Exam</label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-white focus:outline-none focus:border-[#F2C368]"
                >
                  <option value="Group 4 & VAO">Group 4 & VAO</option>
                  <option value="Group 2 & 2A">Group 2 & 2A</option>
                  <option value="Group 1">Group 1</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Native District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-white focus:outline-none focus:border-[#F2C368]"
                >
                  {TN_DISTRICTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9A4C9]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#101626] border border-[#2C3B64] text-white placeholder:text-[#A9A4C9]/60 focus:outline-none focus:border-[#F2C368]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A9A4C9] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F2C368] via-[#DD8F6B] to-[#942F67] hover:opacity-95 text-[#101626] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#F2C368]/20 transition-all mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Free Aspirant Account</span>
            </button>
          </form>
        )}

        <div className="text-[11px] text-center text-[#A9A4C9] pt-1">
          {authMode === 'signin' ? (
            <p>
              Don't have an account yet?{' '}
              <button 
                type="button" 
                onClick={() => setAuthMode('signup')}
                className="text-[#F2C368] font-semibold hover:underline"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already an aspirant member?{' '}
              <button 
                type="button" 
                onClick={() => setAuthMode('signin')}
                className="text-[#F2C368] font-semibold hover:underline"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
