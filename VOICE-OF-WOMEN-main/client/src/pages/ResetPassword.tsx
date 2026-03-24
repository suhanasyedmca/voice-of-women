import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, ArrowRight, ArrowLeft, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Attempt to get email from navigation state
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) return toast.error('Please fill in all fields');
    if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
    if (otp.length !== 6) return toast.error('OTP must be 6 digits');

    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/reset-password', {
        email,
        otp,
        newPassword
      });
      toast.success(response.data.message || 'Password reset successful!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border border-white/20 dark:border-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
          
          {/* Decorative gradients */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative z-10 text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-12">
              <KeyRound className="text-white -rotate-12" size={40} />
            </div>
            <h1 className="text-3xl font-bold font-heading mb-2">Reset Password</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter the 6-digit code sent to <strong>{email || 'your email'}</strong> and choose a new password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email (Confirm)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100/50 dark:bg-gray-800/50 border-0 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-primary transition-all dark:text-white"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">6-Digit OTP</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-gray-100/50 dark:bg-gray-800/50 border-0 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white tracking-[0.5em] font-bold text-center"
                  placeholder="000000"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-100/50 dark:bg-gray-800/50 border-0 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-100/50 dark:bg-gray-800/50 border-0 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 mt-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <Link to="/forgot-password" title="Go back to forgot password" className="text-gray-500 hover:text-primary font-medium inline-flex items-center gap-2 transition-colors">
              <ArrowLeft size={18} />
              Back
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
