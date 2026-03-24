import { HeartPulse, Droplets, CalendarHeart, Video, Activity, Smile, Baby, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HealthcareHub() {
  const doctors = [
    { name: 'Dr. Sarita K', spec: 'OB/GYN Specialist', rating: '4.9', fee: 'Free (Govt)', url: 'https://esanjeevani.mohfw.gov.in/' },
    { name: 'Dr. Neha M', spec: 'Mental Health Counselor', rating: '4.8', fee: '₹300', url: 'https://icallhelpline.org/' },
    { name: 'Dr. Meera Patel', spec: 'Dietitian & Nutritionist', rating: '4.6', fee: '₹500', url: 'https://esanjeevani.mohfw.gov.in/' },
    { name: 'Dr. Aisha Khan', spec: 'Pediatrician', rating: '4.9', fee: 'Free (Govt)', url: 'https://esanjeevani.mohfw.gov.in/' },
    { name: 'Dr. Riya Sharma', spec: 'Dermatologist', rating: '4.7', fee: '₹600', url: 'https://esanjeevani.mohfw.gov.in/' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12 pb-32">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-heading font-bold text-teal-800 mb-4 flex items-center justify-center gap-3">
          <HeartPulse className="h-10 w-10 text-teal-600" />
          Healthcare & Wellness
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Telemedicine, wellness trackers, pregnancy guides, and AI health assistance.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Telemedicine & Doctors */}
        <div className="lg:col-span-2 space-y-6">
          <section className="card border-t-4 border-t-teal-500">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Video className="text-teal-600" /> Telemedicine Portal
            </h2>
            <div className="space-y-4">
              {doctors.map((doc, i) => (
                <div key={i} className="flex justify-between items-center border border-gray-100 hover:border-teal-200 p-4 rounded-xl transition-all dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
                      {doc.name.charAt(4)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{doc.name}</h4>
                      <p className="text-sm text-gray-500">{doc.spec}</p>
                      <p className="text-xs text-yellow-600 font-medium mt-1">⭐ {doc.rating}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-teal-700 mb-2">{doc.fee}</p>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-teal-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-teal-700 shadow-sm transition-colors">
                      Book Slot
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              <a href="https://esanjeevani.mohfw.gov.in/" target="_blank" rel="noopener noreferrer" className="flex-1 btn-outline text-center border-teal-600 text-teal-700 py-2">Find a Doctor</a>
              <a href="https://icallhelpline.org/" target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-red-50 text-red-600 border border-red-200 py-2 rounded-full font-medium hover:bg-red-100">Mental Health Crisis: Call iCall</a>
            </div>
          </section>

          {/* Maternal & Child Health */}
          <section className="card bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-100 dark:border-pink-900/50">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Baby className="text-pink-500" /> Maternal & Infant Care
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/80 dark:bg-dark-card p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-pink-700 text-sm mb-2">Pregnancy Weekly Guide</h4>
                <p className="text-xs text-gray-600 mb-3">Track symptoms, fetal development, and read expert tips for each trimester.</p>
                <div className="w-full bg-pink-100 rounded-full h-2 mb-2">
                  <div className="bg-pink-500 h-2 rounded-full w-[40%]"></div>
                </div>
                <p className="text-xs text-right font-medium text-pink-700">Week 16</p>
              </div>
              <div className="bg-white/80 dark:bg-dark-card p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-pink-700 text-sm mb-2">Govt. Schemes</h4>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li>• <a href="https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">JSY (Janani Suraksha Yojana)</a></li>
                  <li>• <a href="https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">PMMVY (Matru Vandana)</a></li>
                </ul>
                <a href="https://nhm.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs font-bold text-pink-600 hover:underline">View Eligibility &rarr;</a>
              </div>
            </div>
          </section>
        </div>

        {/* Video Resources & Health Issues */}
        <div className="lg:col-span-3 mb-4">
          <section className="card bg-pink-50/50">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <HeartPulse className="text-pink-600" /> Women's Health & Remedies
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="https://www.youtube.com/results?search_query=PCOS+PCOD+diet+and+exercise+remedies" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-pink-100 group">
                <div className="w-full h-32 bg-pink-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                  <span className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></span>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-20 shadow-sm text-pink-600 pl-1">▶</div>
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">PCOS & PCOD Management</h4>
                <p className="text-xs text-gray-500">Dietary remedies, yoga exercises, and medical advice for hormonal balance.</p>
              </a>

              <a href="https://www.youtube.com/results?search_query=Menstrual+cramps+relief+yoga" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-pink-100 group">
                <div className="w-full h-32 bg-pink-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                  <span className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></span>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-20 shadow-sm text-pink-600 pl-1">▶</div>
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Period & Menstrual Health</h4>
                <p className="text-xs text-gray-500">Relief techniques for cramps, tracking cycles, and maintaining hygiene.</p>
              </a>

              <a href="https://www.youtube.com/results?search_query=women+preventive+health+screening" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-pink-100 group">
                <div className="w-full h-32 bg-pink-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                  <span className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></span>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-20 shadow-sm text-pink-600 pl-1">▶</div>
                </div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">Preventive Health Screenings</h4>
                <p className="text-xs text-gray-500">Guides on breast self-exams, thyroid checks, and essential daily vitamins.</p>
              </a>
            </div>
          </section>
        </div>

        {/* Daily Wellness Trackers */}
        <div className="space-y-4">
          <div className="card bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/10 dark:to-emerald-900/10 border-teal-200">
             <h3 className="text-xl font-bold text-teal-900 dark:text-teal-400 mb-2">My Daily Trackers</h3>
             <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Log your water intake, steps, and mood through your personalized dashboard.</p>
             
             <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white dark:bg-dark p-3 rounded-xl flex items-center gap-3 shadow-sm">
                  <Droplets className="text-blue-500" />
                  <span className="font-bold text-sm">Water</span>
                </div>
                <div className="bg-white dark:bg-dark p-3 rounded-xl flex items-center gap-3 shadow-sm">
                  <Activity className="text-green-500" />
                  <span className="font-bold text-sm">Steps</span>
                </div>
                <div className="bg-white dark:bg-dark p-3 rounded-xl flex items-center gap-3 shadow-sm">
                  <CalendarHeart className="text-rose-500" />
                  <span className="font-bold text-sm">Period</span>
                </div>
                <div className="bg-white dark:bg-dark p-3 rounded-xl flex items-center gap-3 shadow-sm">
                  <Smile className="text-purple-500" />
                  <span className="font-bold text-sm">Mood</span>
                </div>
             </div>

             <Link to="/dashboard" className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-sm">
               Open Personal Dashboard <ArrowRight size={18} />
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
