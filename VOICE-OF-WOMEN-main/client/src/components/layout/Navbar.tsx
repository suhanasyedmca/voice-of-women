import { Link, useLocation } from 'react-router-dom';
import { Shield, BookOpen, Briefcase, HeartPulse, User, Menu, X, Home, MessageCircle, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Safety', path: '/safety', icon: Shield },
    { name: 'Education', path: '/education', icon: BookOpen },
    { name: 'Economy', path: '/economy', icon: Briefcase },
    { name: 'Healthcare', path: '/health', icon: HeartPulse },
    { name: 'Chatbot', path: '/chatbot', icon: MessageCircle },
    { name: 'Inspiration', path: '/inspiration', icon: Star },
    { name: 'Dashboard', path: '/dashboard', icon: User },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            V
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
            VOW
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 p-1.5 rounded-full shadow-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
              >
                <Icon size={16} className={isActive ? 'text-primary' : 'text-gray-400'} />
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-dark border-b border-gray-100 dark:border-gray-800 shadow-xl py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-200 p-2 rounded-lg active:bg-gray-50 dark:active:bg-gray-800"
            >
              <link.icon size={20} className="text-primary" />
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
