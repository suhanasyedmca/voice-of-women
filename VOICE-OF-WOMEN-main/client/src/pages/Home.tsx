import { ArrowRight, Shield, BookOpen, Briefcase, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const modules = [
    { name: 'Safety Hub', icon: Shield, color: 'text-red-500', bg: 'bg-red-100' },
    { name: 'Education', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100' },
    { name: 'Economy', icon: Briefcase, color: 'text-secondary-dark', bg: 'bg-secondary-light' },
    { name: 'Healthcare', icon: HeartPulse, color: 'text-accent', bg: 'bg-teal-100' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 lg:px-12 max-w-7xl mx-auto pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left: Text Content */}
          <div className="relative z-10 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-primary/20 text-primary-dark dark:text-primary-light px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6"
            >
              🚀 THE ALL-IN-ONE WOMEN'S PORTAL
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold font-heading text-[#1A0A2E] dark:text-white leading-tight mb-6"
            >
              Empowering Every Girl. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-accent">Protecting Every Voice.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-xl"
            >
              VOW is a comprehensive digital ecosystem offering Aadhaar-verified safety networks, e-learning courses, career mentorship, telemedicine, and AI-powered health tracking for women across India.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/signup" className="btn-primary text-lg flex items-center justify-center gap-2 px-8 py-3 shadow-[0_0_20px_rgba(194,24,91,0.4)]">
                Join the Network <ArrowRight size={20} />
              </Link>
              <a href="#features" className="btn-outline text-lg bg-white/50 backdrop-blur-sm dark:bg-transparent px-8 py-3 flex items-center justify-center">
                Explore Platform
              </a>
            </motion.div>
          </div>

          {/* Right: Premium Image Composition */}
          <div className="relative z-10 hidden lg:block h-[600px] w-full mt-10 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}
              className="absolute right-0 top-0 w-4/5 h-4/5 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-dark-card z-10"
            >
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" alt="Empowered Women" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-multiply"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-0 bottom-10 w-3/5 h-3/5 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-dark-card z-20"
            >
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Students learning" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating Glassmorphism Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-8 top-1/3 z-30 bg-white/70 dark:bg-dark-card/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-4 rounded-2xl flex items-center gap-4"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full text-green-600"><Shield size={24}/></div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Safety Status</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">Active & Secure</p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-primary via-primary-dark to-[#1A0A2E] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
          <motion.div whileHover={{ scale: 1.05 }} className="p-4"><h3 className="text-5xl font-mono font-bold mb-2">50K+</h3><p className="text-primary-light font-medium tracking-wide">Girls Empowered</p></motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4"><h3 className="text-5xl font-mono font-bold mb-2">200+</h3><p className="text-secondary font-medium tracking-wide">Mentors & Courses</p></motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4"><h3 className="text-5xl font-mono font-bold mb-2">15</h3><p className="text-accent font-medium tracking-wide">Regional Languages</p></motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4"><h3 className="text-5xl font-mono font-bold mb-2">10K+</h3><p className="text-primary-light font-medium tracking-wide">Verified Helpers</p></motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="features" className="py-24 px-6 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-primary">4 Pillars of Empowerment</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">A holistic approach to supporting women through every stage of life and challenge.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((mod, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="card text-center flex flex-col items-center"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${mod.bg} ${mod.color}`}>
                  <mod.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{mod.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                  Comprehensive tools and resources for your {mod.name.toLowerCase()} needs.
                </p>
                <Link to={`/${mod.name.split(' ')[0].toLowerCase()}`} className="text-primary font-medium hover:underline text-sm uppercase tracking-wider">
                  Access Portal
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
