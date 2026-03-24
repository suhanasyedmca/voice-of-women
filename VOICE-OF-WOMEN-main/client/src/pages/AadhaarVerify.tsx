import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Info, Loader2, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function AadhaarVerify() {
  const navigate = useNavigate();

  const [aadhaar, setAadhaar] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Validate Aadhaar
  const isValidAadhaar = (num: string) => /^[0-9]{12}$/.test(num);

  // STEP 1 → Send OTP
  const handleAadhaarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidAadhaar(aadhaar)) {
      return toast.error('Aadhaar must be exactly 12 digits');
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      // 🔗 Backend API call
      await axios.post('http://127.0.0.1:5000/api/auth/send-otp', 
        { aadhaar },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('OTP sent (Mock: 123456)');
      setStep(2);

    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 → Verify OTP
  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return toast.error('OTP must be 6 digits');
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:5000/api/auth/verify-otp', 
        { aadhaar, otp },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Aadhaar verified successfully!');
      
      // Update local storage user object
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.isAadhaarVerified = true;
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      navigate('/dashboard');

    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden bg-[#FAF0E6] dark:bg-dark">
      {/* Decorative Background */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl mix-blend-multiply"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl mix-blend-multiply"
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white/80 dark:bg-dark/80 backdrop-blur-sm p-5 rounded-full inline-block shadow-lg border border-white/50 mb-4"
        >
          <ShieldCheck className="h-12 w-12 text-primary" />
        </motion.div>
        
        <h2 className="mt-6 text-4xl font-heading font-extrabold text-[#1A0A2E] dark:text-white">
          Verify Trust Profile
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          VOW uses Aadhaar and OTP to ensure a safe, verified network to protect women.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/70 dark:bg-dark-card/70 backdrop-blur-2xl py-10 px-6 sm:px-10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-3xl border border-white/50 dark:border-white/10">

          {/* Info Box */}
          <div className="bg-primary/10 border border-primary/20 text-primary-dark dark:text-primary-light text-[11px] p-4 rounded-2xl mb-8 flex gap-3 items-start">
            <Info className="h-5 w-5 shrink-0 text-primary mt-0.5" />
            <p className="leading-relaxed">
              <strong>Privacy First:</strong> Your Aadhaar is encrypted. Only the last 4 digits are visible on your profile to maintain privacy.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6" 
                onSubmit={handleAadhaarSubmit}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-gray-300">
                    12-Digit Aadhaar Number
                  </label>

                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      maxLength={12}
                      value={aadhaar}
                      onChange={(e) =>
                        setAadhaar(e.target.value.replace(/\D/g, ''))
                      }
                      className="w-full bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-12 pr-4 text-center tracking-[0.2em] text-2xl font-bold focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                      placeholder="XXXX XXXX XXXX"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 text-lg font-bold shadow-xl flex justify-center items-center gap-2 group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      Send OTP 
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6" 
                onSubmit={handleOtpSubmit}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2 ml-1 text-gray-700 dark:text-gray-300">
                    Enter 6-Digit OTP
                  </label>

                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ''))
                    }
                    className="w-full bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl py-4 text-center tracking-[0.4em] text-3xl font-bold focus:ring-2 focus:ring-secondary outline-none transition-all dark:text-white"
                    placeholder="000000"
                    required
                  />
                  <p className="mt-4 text-center text-xs text-gray-500">
                    Didn't receive code? <button type="button" onClick={() => setStep(1)} className="text-primary font-bold hover:underline">Resend</button>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-secondary hover:bg-secondary-dark text-white py-4 rounded-2xl text-lg font-bold shadow-xl shadow-secondary/20 flex justify-center items-center gap-2 group transition-all transform hover:-translate-y-1"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      Verify & Continue
                      <ShieldCheck className="group-hover:scale-110 transition-transform" size={20} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
