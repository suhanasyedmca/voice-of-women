import { ShieldCheck, Target, CheckCircle2, TrendingUp, CircleAlert, Flame, BookOpen, Briefcase, Plus, Droplet, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [goals, setGoals] = useState([
    { text: 'Drink 8 glasses of water', done: true },
    { text: 'Complete Python chapter 3', done: false },
    { text: 'Update Resume skills', done: false }
  ]);
  const [newGoal, setNewGoal] = useState('');
  
  const [wellness, setWellness] = useState({ water: 5, steps: 4500 }); // Mock initial
  const [progressPercent, setProgressPercent] = useState(75);

  useEffect(() => {
    // Calculate total wellness progress based on goals and wellness inputs
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.done).length;
    let percent = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);
    setProgressPercent(percent);

    // Sync with backend (fire-and-forget for now)
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/trackers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type: 'dailyTracker', data: { goals, wellness } })
      }).catch(err => console.error("Sync error", err));
    }
  }, [goals, wellness]);

  const toggleGoal = (index: number) => {
    const newG = [...goals];
    newG[index].done = !newG[index].done;
    setGoals(newG);
  };

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals([...goals, { text: newGoal, done: false }]);
    setNewGoal('');
    toast.success("Goal added!");
  };

  const updateWellness = (type: 'water' | 'steps', amount: number) => {
    setWellness(prev => ({ ...prev, [type]: prev[type] + amount }));
    toast.success(`Logged ${amount} ${type === 'water' ? 'glass(es)' : 'steps'}!`);
  };

  const stats = [
    { label: 'Courses Completed', value: 2, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Jobs Saved', value: 5, icon: Briefcase, color: 'text-secondary-dark', bg: 'bg-secondary-light' },
    { label: 'Activity Streak', value: '12 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' }
  ];

  const weeklyData = [
    { day: 'Mon', water: 4, steps: 3000 },
    { day: 'Tue', water: 6, steps: 4500 },
    { day: 'Wed', water: 8, steps: 6000 },
    { day: 'Thu', water: 5, steps: 4000 },
    { day: 'Fri', water: 7, steps: 5500 },
    { day: 'Sat', water: 8, steps: 7200 },
    { day: 'Sun', water: wellness.water, steps: wellness.steps },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-32">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome back, Ananya! 🌸</h1>
          <p className="opacity-90 max-w-xl">
            "There is no limit to what we, as women, can accomplish." - Michelle Obama
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div whileHover={{ y: -5 }} key={i} className="card flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">{stat.value}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Goals & Progress */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Target className="text-primary" /> Today's Goals
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {goals.map((g, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                    <input 
                      type="checkbox" 
                      checked={g.done} 
                      onChange={() => toggleGoal(i)}
                      className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary" 
                    />
                    <span className={`text-sm ${g.done ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>{g.text}</span>
                  </label>
                ))}
            </div>
            <form onSubmit={addGoal} className="mt-4 flex gap-2">
              <input 
                type="text" 
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Add daily need / goal..." 
                className="input-field py-2 text-sm border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark"
              />
              <button type="submit" className="bg-primary text-white p-2 rounded-xl hover:bg-primary-dark transition-colors">
                <Plus size={20} />
              </button>
            </form>
            </div>

            <div className="card text-center flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 w-full text-left">Daily Wellness</h3>
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="none" className="text-gray-100 dark:text-gray-800" />
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset={351 - (351 * progressPercent) / 100} className="text-accent transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-mono text-gray-900 dark:text-white">{progressPercent}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 mb-4">Complete goals to fill your ring!</p>
              
              <div className="w-full grid grid-cols-2 gap-4 mt-auto">
                <div className="flex flex-col justify-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Droplet size={18} />
                    <span className="text-sm font-bold">{wellness.water} / 8</span>
                  </div>
                  <div className="flex justify-between gap-1">
                    <button onClick={() => updateWellness('water', -1)} className="flex-1 bg-white dark:bg-dark text-blue-600 rounded shadow-sm py-1 hover:bg-blue-100 transition disabled:opacity-50 font-bold" disabled={wellness.water <= 0}>-</button>
                    <button onClick={() => updateWellness('water', 1)} className="flex-1 bg-white dark:bg-dark text-blue-600 rounded shadow-sm py-1 hover:bg-blue-100 transition font-bold">+</button>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Activity size={18} />
                    <span className="text-sm font-bold">{wellness.steps}</span>
                  </div>
                  <div className="flex justify-between gap-1">
                    <button onClick={() => updateWellness('steps', -500)} className="flex-1 bg-white dark:bg-dark text-green-600 rounded shadow-sm py-1 hover:bg-green-100 transition disabled:opacity-50 font-bold" disabled={wellness.steps <= 0}>-</button>
                    <button onClick={() => updateWellness('steps', 500)} className="flex-1 bg-white dark:bg-dark text-green-600 rounded shadow-sm py-1 hover:bg-green-100 transition font-bold">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recharts Analytics Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card h-[350px] flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Weekly Water Intake</h3>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[0, 10]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="water" 
                      stroke="#3b82f6" 
                      strokeWidth={4} 
                      dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card h-[350px] flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Weekly Steps</h3>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ fill: '#f1f5f9' }}
                    />
                    <Bar 
                      dataKey="steps" 
                      fill="#10b981" 
                      radius={[6, 6, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* SOS Readiness */}
          <div className="card bg-green-50/50 dark:bg-green-900/10 border-2 border-green-100 dark:border-green-800/50">
            <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
              <ShieldCheck /> SOS Readiness
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Aadhaar Verified</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-500 w-5 h-5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">3 Trusted Contacts Added</span>
              </li>
              <li className="flex items-center gap-3">
                <CircleAlert className="text-orange-500 w-5 h-5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Location Permission Missing</span>
              </li>
            </ul>
            <button className="w-full mt-6 btn-outline text-sm py-2 bg-white dark:bg-transparent">Fix Issues</button>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-500" /> Upcoming Events
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-l-blue-400 pl-3">
                <p className="text-xs text-blue-600 font-bold mb-1">Today, 5:00 PM</p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Intro to Data Science</p>
              </div>
              <div className="border-l-4 border-l-teal-400 pl-3">
                <p className="text-xs text-teal-600 font-bold mb-1">Tomorrow, 10:00 AM</p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Mental Health Webinar</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
