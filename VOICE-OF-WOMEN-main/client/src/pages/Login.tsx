import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/auth/login', formData);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          isAadhaarVerified: res.data.isAadhaarVerified
        }));

        toast.success(`Welcome back, ${res.data.name}!`);
        
        // Redirect based on role or verification status
        if (res.data.role === 'admin') {
          navigate('/admin');
        } else if (!res.data.isAadhaarVerified) {
          toast.success('Please verify your Aadhaar to access all features.');
          navigate('/aadhaar-verify');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 lg:px-8 relative overflow-hidden bg-[#FAF0E6] dark:bg-dark">
      {/* Visual Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 dark:bg-dark/80 backdrop-blur-md p-4 rounded-[2rem] inline-block shadow-2xl border border-white/50 mb-6"
          >
            <LogIn className="h-10 w-10 text-primary" />
          </motion.div>
          
          <h2 className="text-4xl font-heading font-extrabold text-[#1A0A2E] dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Sign in to your VOW trusted account
          </p>
        </div>

        {/* Main Login Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[3rem] border border-white/60 dark:border-white/10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Email ID</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  name="email"
                  type="email" 
                  required 
                  className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                  placeholder="name@example.com"
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  name="password"
                  type="password" 
                  required 
                  className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  onChange={handleChange} 
                />
              </div>
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" size-xs className="text-[11px] font-bold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1A0A2E] hover:bg-black text-white py-4 rounded-2xl text-lg font-bold shadow-2xl flex justify-center items-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200 dark:border-gray-700"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-dark-card px-4 text-gray-400 font-bold tracking-widest">Aadhaar Integrated</span></div>
          </div>

          {/* User's request: Add Aadhaar details on login page */}
          <div className="bg-primary/5 dark:bg-primary/10 p-5 rounded-2xl border border-primary/10 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors" 
              onClick={() => navigate('/aadhaar-verify')}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-xl">
                <ShieldCheck className="text-primary h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A0A2E] dark:text-white">Verify with Aadhaar</p>
                <p className="text-[10px] text-gray-500">Enable 2-Factor Trust Profile</p>
              </div>
            </div>
            <Sparkles className="text-primary/40 group-hover:text-primary transition-colors" size={18} />
          </div>
        </motion.div>

        <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Not part of the network?{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline transition-all">
            Join VOW today
          </Link>
        </p>
      </div>
    </div>
  );
}
