import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ShieldCheck, Mail, Lock, Phone, User as UserIcon, Calendar, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: 'Female',
    age: '',
    role: 'Student',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/auth/register', formData);
      if (res.status === 201) {
        toast.success('Registration successful! Please verify your Aadhaar.');
        // Store user and token
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify({
          _id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          isAadhaarVerified: res.data.isAadhaarVerified
        }));
        
        // Redirect to Aadhaar Verification for first-time trust building
        navigate('/aadhaar-verify');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed. Check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 lg:px-8 relative overflow-hidden bg-[#FAF0E6] dark:bg-dark">
      {/* Dynamic Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-10 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl mix-blend-multiply"
      />
      <motion.div 
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute bottom-10 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-multiply"
      />

      <div className="w-full max-w-2xl relative z-10 scale-in">
        <div className="text-center mb-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-dark/80 backdrop-blur-sm p-5 rounded-full inline-block shadow-lg border border-white/50 mb-4"
          >
            <UserPlus className="h-10 w-10 text-primary" />
          </motion.div>
          <h2 className="text-4xl font-heading font-extrabold text-[#1A0A2E] dark:text-white tracking-tight">
            Join the Sisterhood
          </h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Create an account to access education, health, and economic support.
          </p>
        </div>

        <div className="bg-white/70 dark:bg-dark-card/70 backdrop-blur-2xl py-10 px-8 sm:px-12 shadow-[0_8px_32px_rgba(30,10,60,0.1)] rounded-[2.5rem] border border-white/50 dark:border-white/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    name="name"
                    type="text" 
                    required 
                    placeholder="Amrita Devi"
                    className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white shadow-sm"
                    onChange={handleChange} 
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    name="email"
                    type="email" 
                    required 
                    placeholder="amrita@example.com"
                    className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white shadow-sm"
                    onChange={handleChange} 
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    name="phone"
                    type="tel" 
                    required 
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white shadow-sm"
                    onChange={handleChange} 
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Create Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    name="password"
                    type="password" 
                    required 
                    placeholder="••••••••"
                    className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white shadow-sm"
                    onChange={handleChange} 
                  />
                </div>
              </div>

              {/* Gender & Age */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Gender</label>
                  <select 
                    name="gender"
                    className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-3.5 px-4 focus:ring-2 focus:ring-primary outline-none dark:text-white transition-all appearance-none cursor-pointer" 
                    onChange={handleChange}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Age</label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      name="age"
                      type="number" 
                      required 
                      placeholder="25"
                      className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white shadow-sm"
                      onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>

              {/* Role & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Your Role</label>
                  <select 
                    name="role"
                    className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-3.5 px-4 focus:ring-2 focus:ring-primary outline-none dark:text-white transition-all appearance-none cursor-pointer" 
                    onChange={handleChange}
                  >
                    <option value="Student">Student</option>
                    <option value="Professional">Professional</option>
                    <option value="Homemaker">Homemaker</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">City/State</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      name="location"
                      type="text" 
                      placeholder="Delhi"
                      className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white shadow-sm"
                      onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary py-4 text-lg font-bold shadow-xl shadow-primary/20 flex justify-center items-center gap-2 group transition-all"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Join the Movement
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500 font-medium">
              By joining, you agree to VOW's <span className="text-primary cursor-pointer hover:underline">Terms of Safety</span> and <span className="text-primary cursor-pointer hover:underline">Privacy Charter</span>.
            </p>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            Already a member?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log in securely
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
