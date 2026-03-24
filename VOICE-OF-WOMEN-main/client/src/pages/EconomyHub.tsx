import { Briefcase, Landmark, CheckCircle2, TrendingUp, PieChart, Plus, Trash2, Download } from 'lucide-react';
import { useState } from 'react';

export default function EconomyHub() {
  const [income, setIncome] = useState<number>(0);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState<number>(0);
  const [expenses, setExpenses] = useState<{name: string, amt: number}[]>([]);
  const [resumeData, setResumeData] = useState({
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 9876543210',
    skills: 'Data Entry, Communication, Python Basics',
    experience: 'Completed VOW Skill Developer Assessment\nVOW Platform Coordinator'
  });
  const [showResume, setShowResume] = useState(false);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amt, 0);
  const savings = income - totalExpenses;

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (expenseName && expenseAmount > 0) {
      setExpenses([...expenses, { name: expenseName, amt: expenseAmount }]);
      setExpenseName('');
      setExpenseAmount(0);
    }
  };

  const jobs = [
    { title: 'Software Engineer', company: 'Naukri.com Portal', location: 'Remote / Hybrid', salary: '₹8L - ₹15L', womenFriendly: true, url: 'https://www.naukri.com/' },
    { title: 'Marketing Intern', company: 'Internshala', location: 'Work From Home', salary: 'Stipend ₹10k', womenFriendly: true, url: 'https://internshala.com/' },
    { title: 'Govt Teacher (PGT/TGT)', company: 'NCS Govt. Portal', location: 'Pan India', salary: '₹6L - ₹8L', womenFriendly: true, url: 'https://www.ncs.gov.in/' },
    { title: 'Freelance Content Writer', company: 'Fiverr / Upwork', location: 'Remote', salary: 'Flexible', womenFriendly: true, url: 'https://www.upwork.com/' },
    { title: 'Data Analyst', company: 'TCS Empowers', location: 'Bangalore / Pune', salary: '₹6L - ₹10L', womenFriendly: true, url: 'https://www.tcs.com/careers' },
    { title: 'HR Manager', company: 'LinkedIn Jobs', location: 'Mumbai', salary: '₹12L - ₹18L', womenFriendly: true, url: 'https://www.linkedin.com/jobs/' },
    { title: 'Virtual Assistant', company: 'HerSecondInnings', location: 'Work From Home', salary: '₹3L - ₹5L', womenFriendly: true, url: 'https://www.hersecondinnings.com/' }
  ];

  const microfinance = [
    { provider: 'PM MUDRA Yojana', limit: 'Up to ₹10 Lakhs', interest: '7-12%', tag: 'Govt Scheme', url: 'https://www.mudra.org.in/' },
    { provider: 'SEWA Bank', limit: 'Up to ₹5 Lakhs', interest: '8%', tag: 'NGO', url: 'https://www.sewabank.com/' },
    { provider: 'Stand-Up India', limit: '₹10L - ₹1Cr', interest: 'Varies', tag: 'Govt Scheme', url: 'https://www.standupmitra.in/' },
    { provider: 'Annapurna Microfinance', limit: '₹50k - ₹3L', interest: '9%', tag: 'Private', url: 'https://ampl.net.in/' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12 pb-32">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-heading font-bold text-secondary-dark mb-4 flex items-center justify-center gap-3">
          <Briefcase className="h-10 w-10 text-secondary-dark" />
          Economy & Career
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explore job opportunities, apply for microfinance, and manage your budget securely.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Job Board */}
        <div className="lg:col-span-2 space-y-6">
          <section className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Briefcase className="text-secondary-DEFAULT" /> Job Portal
              </h2>
              <button className="text-sm font-medium text-secondary-dark hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <div key={i} className="border border-gray-100 hover:border-secondary-DEFAULT rounded-xl p-4 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
                    </div>
                    {job.womenFriendly && (
                      <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                        <CheckCircle2 size={12} /> Women Friendly
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{job.salary}</span>
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn-secondary px-4 py-1.5 text-sm rounded-lg hover:shadow-sm inline-block">Apply Externally</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Microfinance */}
          <section className="card bg-secondary-light/30">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Landmark className="text-secondary-dark" /> Microfinance & Loans
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {microfinance.map((mf, i) => (
                <div key={i} className="bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                  <span className="text-xs font-bold text-secondary-dark bg-secondary-light px-2 py-1 rounded-full mb-2 self-start">
                    {mf.tag}
                  </span>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">{mf.provider}</h4>
                  <p className="text-sm text-gray-600 mt-1">Limit: {mf.limit}</p>
                  <p className="text-sm text-gray-600 mb-4">Interest: {mf.interest}</p>
                  <a href={mf.url} target="_blank" rel="noopener noreferrer" className="mt-auto block text-center text-secondary-dark text-sm font-medium border border-secondary-dark hover:bg-secondary-dark hover:text-white py-1.5 rounded-lg transition-colors">
                    Official Website
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Features */}
        <div className="space-y-6">
          
          <div className="card bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
            <h3 className="font-bold text-green-800 dark:text-green-400 flex items-center gap-2 mb-2">
              <TrendingUp size={20} /> Skill Developer Hub
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300 mb-4">Enhance your employability with free verified certifications.</p>
            <div className="space-y-2 mb-4">
              <a href="https://learndigital.withgoogle.com/digitalunlocked" target="_blank" rel="noopener noreferrer" className="block p-2 bg-white/60 dark:bg-black/20 rounded-lg text-sm font-medium text-green-800 dark:text-green-300 hover:bg-white dark:hover:bg-black/40 transition">
                🌐 Google Digital Marketing
              </a>
              <a href="https://skillsbuild.org/" target="_blank" rel="noopener noreferrer" className="block p-2 bg-white/60 dark:bg-black/20 rounded-lg text-sm font-medium text-green-800 dark:text-green-300 hover:bg-white dark:hover:bg-black/40 transition">
                💻 IBM SkillsBuild (Tech)
              </a>
              <a href="https://www.tcsion.com/" target="_blank" rel="noopener noreferrer" className="block p-2 bg-white/60 dark:bg-black/20 rounded-lg text-sm font-medium text-green-800 dark:text-green-300 hover:bg-white dark:hover:bg-black/40 transition">
                📊 TCS iON Career Edge
              </a>
            </div>
          </div>

          <div className="card border-primary border-t-4">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
              <PieChart className="text-primary" size={20} /> Monthly Budget Tracker
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Monthly Income (₹)</label>
                <input 
                  type="number" 
                  value={income || ''} 
                  onChange={e => setIncome(Number(e.target.value))}
                  className="w-full mt-1 p-2 bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  placeholder="e.g. 50000"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Add Expense</label>
                <form onSubmit={addExpense} className="flex gap-2 mt-1">
                  <input 
                    type="text" 
                    value={expenseName} 
                    onChange={e => setExpenseName(e.target.value)}
                    placeholder="Rent, Groceries..." 
                    className="flex-1 p-2 bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />
                  <input 
                    type="number" 
                    value={expenseAmount || ''} 
                    onChange={e => setExpenseAmount(Number(e.target.value))}
                    placeholder="Amt" 
                    className="w-20 p-2 bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                  />
                  <button type="submit" className="bg-primary text-white p-2 rounded-lg"><Plus size={16}/></button>
                </form>
              </div>

              {expenses.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg max-h-32 overflow-y-auto space-y-2">
                  {expenses.map((exp, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{exp.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-red-500">-₹{exp.amt}</span>
                        <button onClick={() => setExpenses(expenses.filter((_, i) => i !== idx))} className="text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Total Savings</span>
                  <span className={`font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>₹{savings}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${savings >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: income > 0 ? `${Math.min(100, Math.max(0, (savings / income) * 100))}%` : '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-secondary-DEFAULT border-t-4">
            <h3 className="font-bold text-gray-800 dark:text-white mb-2 max-w-full">Interactive Resume Builder</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-full overflow-hidden text-ellipsis">Build an ATS-friendly functional resume.</p>
            {showResume ? (
              <div className="animate-fade-in">
                
                {/* Edit Form */}
                <div className="space-y-3 mb-4">
                  <input type="text" value={resumeData.name} onChange={e => setResumeData({...resumeData, name: e.target.value})} className="input-field py-1.5 text-sm" placeholder="Full Name"/>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="email" value={resumeData.email} onChange={e => setResumeData({...resumeData, email: e.target.value})} className="input-field py-1.5 text-sm" placeholder="Email"/>
                    <input type="tel" value={resumeData.phone} onChange={e => setResumeData({...resumeData, phone: e.target.value})} className="input-field py-1.5 text-sm" placeholder="Phone"/>
                  </div>
                  <input type="text" value={resumeData.skills} onChange={e => setResumeData({...resumeData, skills: e.target.value})} className="input-field py-1.5 text-sm" placeholder="Comma separated skills"/>
                  <textarea value={resumeData.experience} onChange={e => setResumeData({...resumeData, experience: e.target.value})} className="input-field py-1.5 text-sm min-h-[60px]" placeholder="Experience details..."/>
                </div>

                {/* Live Preview */}
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-dark text-xs font-mono space-y-2 overflow-x-hidden relative" id="resume-preview">
                  <h4 className="font-bold text-lg border-b border-primary/20 pb-1 text-primary break-words whitespace-normal">{resumeData.name || 'Your Name'}</h4>
                  <p className="text-gray-600 dark:text-gray-400 break-all whitespace-normal">Email: {resumeData.email}</p>
                  <p className="text-gray-600 dark:text-gray-400 break-all whitespace-normal">Phone: {resumeData.phone}</p>
                  
                  <p className="font-bold mt-3 text-secondary-dark">Skills:</p>
                  <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 break-words whitespace-normal">
                    {resumeData.skills.split(',').map((s, i) => s.trim() ? <li key={i}>{s.trim()}</li> : null)}
                  </ul>
                  
                  <p className="font-bold mt-3 text-secondary-dark">Experience:</p>
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line break-words">{resumeData.experience}</div>
                </div>
                
                <button onClick={() => window.print()} className="w-full btn-secondary py-2 text-sm flex items-center justify-center gap-2">
                  Print / Save PDF <Download size={16} />
                </button>
                <button onClick={() => setShowResume(false)} className="w-full text-center text-xs text-red-500 mt-3 hover:underline">Close Builder</button>
              </div>
            ) : (
              <button onClick={() => setShowResume(true)} className="w-full btn-outline py-2 text-sm flex items-center justify-center gap-2">
                Open Resume Builder <Briefcase size={16} />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
