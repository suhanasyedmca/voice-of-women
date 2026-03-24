import { BookOpen, Award, Users, Search, Download } from 'lucide-react';

export default function EducationHub() {
  const courses = [
    { title: 'Full Stack Web Development', provider: 'Udemy', category: 'IT & Software', level: 'Beginner', url: 'https://www.udemy.com/' },
    { title: 'Data Science Certification', provider: 'Simplilearn', category: 'Data & Tech', level: 'Intermediate', url: 'https://www.simplilearn.com/' },
    { title: 'Cybersecurity Fundamentals', provider: 'Cisco Networking Academy', category: 'Security', level: 'Beginner', url: 'https://www.netacad.com/' },
    { title: 'Springboard to Tech', provider: 'Infosys Springboard', category: 'Tech Foundation', level: 'All Levels', url: 'https://infyspringboard.onwingspan.com/' },
    { title: 'UPSC / SSC Free Prep Videos', provider: 'Govt Exam Portal', category: 'Competitive Exams', level: 'Advanced', url: 'https://www.studyiq.com/' },
    { title: 'Python for Beginners', provider: 'Coursera', category: 'STEM', level: 'Beginner', url: 'https://www.coursera.org/' }
  ];

  const mentors = [
    { name: 'Dr. Aditi Sharma', field: 'Medicine', role: 'Senior Resident & Health Guide', languages: 'Hindi, English', color: 'bg-blue-100 text-blue-600' },
    { name: 'Priya Patel', field: 'IT & Software', role: 'Senior Engineer at Google', languages: 'English, Gujarati', color: 'bg-green-100 text-green-600' },
    { name: 'Anita Desai', field: 'Finance', role: 'Chartered Accountant', languages: 'Marathi, English', color: 'bg-purple-100 text-purple-600' },
    { name: 'Zoya Khan', field: 'Law', role: 'High Court Advocate', languages: 'Urdu, English', color: 'bg-rose-100 text-rose-600' },
    { name: 'Dr. Meera Menon', field: 'Psychology', role: 'Clinical Psychologist', languages: 'Malayalam, English', color: 'bg-teal-100 text-teal-600' }
  ];

  const scholarships = [
    { title: 'National Scholarship Portal', provider: 'Govt. of India', deadline: 'Year-round', url: 'https://scholarships.gov.in/' },
    { title: 'AICTE Pragati Scholarship for Girls', provider: 'AICTE', deadline: 'Oct 31, 2026', url: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati-Scholarship-Scheme' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12 pb-32">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-heading font-bold text-blue-800 mb-4 flex items-center justify-center gap-3">
          <BookOpen className="h-10 w-10 text-blue-500" />
          Education & Mentorship
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Access free courses, connect with accomplished female mentors, and find scholarships.
        </p>
      </div>

      {/* E-Learning View */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Award className="text-blue-500" /> Curated Courses
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input type="text" placeholder="Search courses..." className="pl-9 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <div key={i} className="card group hover:-translate-y-1 transition-transform cursor-pointer border-t-4 border-t-blue-400">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-3 inline-block">{course.category}</span>
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{course.provider} • {course.level}</p>
              <div className="flex justify-between items-center mt-auto">
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:underline">Start Learning</a>
                <span title="Offline PDF available">
                  <Download className="h-4 w-4 text-gray-400 hover:text-blue-500" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Mentorship Program */}
        <section className="card bg-blue-50/50 dark:bg-dark-card">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <Users className="text-blue-600" /> Find a Mentor
          </h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {mentors.map((mentor, i) => (
              <div key={i} className="bg-white dark:bg-dark p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${mentor.color} rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform`}>
                    {mentor.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {mentor.name} <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{mentor.field}</span>
                    </h4>
                    <p className="text-sm text-gray-500 font-medium">{mentor.role}</p>
                    <p className="text-xs text-gray-400 mt-1">Speaks: {mentor.languages}</p>
                  </div>
                </div>
                <button className="btn-outline text-sm px-4 py-1.5 border-blue-500 text-blue-600 hover:bg-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  Connect
                </button>
              </div>
            ))}
            <button className="w-full text-center text-sm font-medium text-blue-600 mt-4 hover:underline">View All Mentors ➔</button>
          </div>
        </section>

        {/* Scholarships */}
        <section className="card">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <Award className="text-orange-500" /> Scholarships & Aids
          </h2>
          <div className="space-y-4">
            {scholarships.map((sch, i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200">{sch.title}</h4>
                  <p className="text-sm text-gray-500">{sch.provider}</p>
                  <p className="text-xs text-orange-600 font-medium mt-1">Deadline: {sch.deadline}</p>
                </div>
                <a href={sch.url} target="_blank" rel="noopener noreferrer" className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-orange-200">Apply</a>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-orange-50 rounded-xl">
            <h4 className="font-bold text-orange-800 text-sm mb-1">Check Eligibility</h4>
            <p className="text-xs text-orange-600 mb-3">Fill a quick form to find schemes matching your profile.</p>
            <button className="text-sm bg-orange-500 text-white px-4 py-1.5 rounded-lg shadow-sm hover:bg-orange-600">Start Checker</button>
          </div>
        </section>
      </div>

    </div>
  );
}
