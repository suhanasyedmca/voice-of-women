import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');

    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/auth/forgot-password', { email });
      toast.success(response.data.message || 'OTP sent to your email');
      // Navigate to reset password page and pass email in state
      navigate('/reset-password', { state: { email } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
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
              <Mail className="text-white -rotate-12" size={40} />
            </div>
            <h1 className="text-3xl font-bold font-heading mb-2">Forgot Password</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email and we'll send you a 6-digit OTP to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100/50 dark:bg-gray-800/50 border-0 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <Link to="/login" className="text-primary hover:text-accent font-medium inline-flex items-center gap-2 transition-colors">
              <ArrowLeft size={18} />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
