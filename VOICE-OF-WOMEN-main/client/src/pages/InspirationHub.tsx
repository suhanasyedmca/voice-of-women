import { Star, Award, TrendingUp, Sparkles, Quote, BookOpen, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const heroines = [
  {
    name: 'Kalpana Chawla',
    field: 'Astronautics & Aerospace Engineering',
    tag: 'Pioneer',
    born: '1962, Karnal, Haryana',
    img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    // Space shuttle / nebula
    thumbImg: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=400',
    bio: 'The first woman of Indian origin to travel to space, Kalpana Chawla flew aboard the Space Shuttle Columbia in 1997 as a mission specialist and primary robotic arm operator. She logged over 376 hours in space across two missions and earned a PhD in Aerospace Engineering from the University of Colorado. Tragically lost in the Columbia disaster of 2003, her courage and brilliance continue to ignite the dreams of millions of girls worldwide.',
    achievements: [
      '376+ hours logged in space',
      'PhD in Aerospace Engineering',
      'NASA Distinguished Service Medal (posthumous)',
      'Congressional Space Medal of Honor',
    ],
    quote: '"The path from dreams to success does exist. May you have the vision to find it, the courage to get on to it, and the perseverance to follow it."',
    color: 'from-indigo-600 to-violet-700',
    accentColor: '#7c3aed',
  },
  {
    name: 'Mary Kom',
    field: 'Professional Boxing & Sports',
    tag: 'Champion',
    born: '1983, Kangathei, Manipur',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    // Boxing / training gym
    thumbImg: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=400',
    bio: 'Magnificent Mary — the only woman boxer to have won a medal in each of the first seven World Amateur Boxing Championships. A mother of three from a humble farming family in Manipur, she overcame financial hardship and societal resistance to become a global icon. She won the bronze medal at the 2012 London Olympics, becoming the first Indian woman boxer to do so. Her story is a masterclass in relentless grit.',
    achievements: [
      '6× World Amateur Boxing Champion',
      'Olympic Bronze Medalist (London 2012)',
      'Padma Vibhushan (2020)',
      'Rajiv Gandhi Khel Ratna Award',
    ],
    quote: '"I am a fighter, not just in the ring, but in life."',
    color: 'from-rose-600 to-pink-700',
    accentColor: '#e11d48',
  },
  {
    name: 'Kiran Mazumdar-Shaw',
    field: 'Biotechnology & Entrepreneurship',
    tag: 'Entrepreneur',
    born: '1953, Bangalore, Karnataka',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800',
    // Lab / biotech
    thumbImg: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=400',
    bio: 'Starting Biocon in her Bangalore garage with just ₹10,000 in 1978, Kiran Mazumdar-Shaw built it into India\'s largest biopharmaceutical company worth billions. A trained brewer who was denied jobs because of her gender, she pivoted into biotech and pioneered affordable insulin and cancer treatments that have reached patients globally. TIME magazine listed her among the 100 Most Influential People in the World multiple times.',
    achievements: [
      'Founded Biocon — India\'s largest biopharma',
      'Padma Bhushan & Padma Shri recipient',
      'TIME 100 Most Influential (multiple years)',
      'EY World Entrepreneur of the Year',
    ],
    quote: '"Innovation is seeing what everybody has seen and thinking what nobody has thought."',
    color: 'from-emerald-600 to-teal-700',
    accentColor: '#059669',
  },
  {
    name: 'Gita Gopinath',
    field: 'Macroeconomics & Global Finance',
    tag: 'Leader',
    born: '1971, Kolkata, West Bengal',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    // Finance / stock market
    thumbImg: 'https://images.unsplash.com/photo-1590402494682-bf346f83961c?auto=format&fit=crop&q=80&w=400',
    bio: 'A Harvard Economics professor who rose to become the First Deputy Managing Director of the International Monetary Fund — the second-highest position in the institution. She previously served as IMF Chief Economist, the first woman ever to hold that role. Her research on international finance, exchange rates, and emerging markets has directly shaped global economic policy across dozens of nations. She grew up in Mysore and earned her PhD from Princeton University.',
    achievements: [
      'IMF First Deputy Managing Director',
      'First woman IMF Chief Economist',
      'Harvard Economics Professor (John Zwaanstra Chair)',
      'Top 25 economists under 45 (IMF)',
    ],
    quote: '"The global economy needs more evidence-based policy, less ideology."',
    color: 'from-amber-500 to-orange-600',
    accentColor: '#d97706',
  },
  {
    name: 'Sudha Murty',
    field: 'Literature, Education & Philanthropy',
    tag: 'Philanthropist',
    born: '1950, Shiggaon, Karnataka',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
    // Library / books
    thumbImg: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=400',
    bio: 'A former engineer who became one of India\'s most beloved authors and philanthropists, Sudha Murty is the chairperson of the Infosys Foundation and has authored over 30 books in Kannada and English — many of which have become school curricula. She funded thousands of libraries across rural Karnataka, built hospitals and orphanages, and championed sanitation access across villages. She was recently nominated to the Rajya Sabha and received the Padma Bhushan in 2006.',
    achievements: [
      '30+ books published, translated into 15 languages',
      'Padma Bhushan (2006) & Padma Vibhushan (2023)',
      'Founded 2300+ libraries across Karnataka',
      'Rajya Sabha MP (nominated 2024)',
    ],
    quote: '"Simple living, high thinking — that is what makes life truly rich."',
    color: 'from-sky-500 to-blue-700',
    accentColor: '#0284c7',
  },
  {
    name: 'Falguni Nayar',
    field: 'Business & Beauty E-commerce',
    tag: 'Innovator',
    born: '1963, Mumbai, Maharashtra',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    // Beauty / cosmetics flat lay
    thumbImg: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=400',
    bio: 'At an age when most executives are considering retirement, Falguni Nayar quit her prestigious 18-year investment banking career at Kotak Mahindra to found Nykaa in 2012. She disrupted India\'s beauty industry by building a multi-brand omnichannel platform that went public in 2021, making her one of India\'s wealthiest self-made women billionaires. Her story dismantles every assumption about age, risk, and ambition.',
    achievements: [
      'Founded Nykaa — valued at $13B+ at IPO',
      'One of India\'s richest self-made women',
      'FICCI Ladies Organization Outstanding Businesswoman',
      'Expanded to 200+ physical stores across India',
    ],
    quote: '"Age is just a number. If you have a vision and the will to execute it, the timing is always right."',
    color: 'from-fuchsia-500 to-pink-600',
    accentColor: '#c026d3',
  },
];

// --- AchievementBadge was removed as it was unused ---

export default function InspirationHub() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12 pb-32">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-white/60 dark:bg-white/10 backdrop-blur-md border border-primary/20 text-primary-dark dark:text-primary-light px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6"
        >
          <Sparkles size={16} className="inline mr-2 -mt-1" />
          WALL OF HEROINES
        </motion.div>

        <h1 className="text-5xl font-heading font-extrabold text-[#1A0A2E] dark:text-white leading-tight mb-4">
          Biographies of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Success
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Draw inspiration from the phenomenal women who broke the mold, defied the odds, and paved
          the way for generations to come. If they did it, so can you.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {heroines.map((person, i) => {
          const isExpanded = expanded === i;
          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              key={i}
              className="group relative bg-white/70 dark:bg-dark-card/70 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_8px_40px_rgba(194,24,91,0.18)] border border-white/50 dark:border-white/10 transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              {/* Hero Image */}
              <div className="h-52 overflow-hidden relative shrink-0">
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${person.color} opacity-60 z-10`}
                />
                <img
                  src={person.img}
                  alt={person.field}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Tag + Born */}
                <div className="absolute bottom-4 left-4 z-20 flex gap-2 items-center flex-wrap">
                  <span
                    className="text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: `${person.accentColor}cc` }}
                  >
                    <Star size={11} /> {person.tag}
                  </span>
                  <span className="bg-black/40 backdrop-blur text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Globe size={10} /> {person.born}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-1">
                  <h3 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
                    {person.name}
                  </h3>
                  <p
                    className="text-sm font-bold tracking-wide uppercase mt-1 mb-4 flex items-center gap-2"
                    style={{ color: person.accentColor }}
                  >
                    <Award size={15} /> {person.field}
                  </p>
                </div>

                {/* Bio */}
                <p
                  className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 ${isExpanded ? '' : 'line-clamp-3'
                    }`}
                >
                  {person.bio}
                </p>

                {/* Achievements — visible when expanded */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {/* Quote */}
                      <blockquote
                        className="text-sm italic text-white rounded-xl p-4 mb-4 relative"
                        style={{ background: `linear-gradient(135deg, ${person.accentColor}cc, ${person.accentColor}88)` }}
                      >
                        <Quote size={18} className="absolute top-3 left-3 opacity-40" />
                        <span className="pl-5 block">{person.quote}</span>
                      </blockquote>

                      {/* Key Achievements */}
                      <div className="mb-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                          <BookOpen size={12} /> Key Achievements
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {person.achievements.map((ach, j) => (
                            <span
                              key={j}
                              className="text-xs px-2.5 py-1 rounded-full font-medium border"
                              style={{
                                borderColor: `${person.accentColor}44`,
                                color: person.accentColor,
                                backgroundColor: `${person.accentColor}11`,
                              }}
                            >
                              {ach}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  className="mt-auto text-sm font-bold tracking-wide flex items-center gap-1 transition-colors"
                  style={{ color: person.accentColor }}
                >
                  {isExpanded ? 'Show Less' : 'Read Full Story'}
                  <TrendingUp
                    size={15}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                  />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Banner */}
      <section className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { number: '6', label: 'Fields of Excellence', icon: '🌟' },
          { number: '20+', label: 'Major Awards Won', icon: '🏆' },
          { number: '3', label: 'Billionaire Founders', icon: '💡' },
          { number: '∞', label: 'Lives Inspired', icon: '❤️' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/70 dark:bg-dark-card/70 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl p-6 text-center"
          >
            <div className="text-3xl mb-1">{stat.icon}</div>
            <div className="text-3xl font-extrabold text-[#1A0A2E] dark:text-white font-heading">
              {stat.number}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1 uppercase tracking-wide">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Inspirational Quote Banner */}
      <section className="mt-12 bg-gradient-to-r from-primary via-primary-dark to-[#1A0A2E] text-white rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <QuoteIcon className="mx-auto w-12 h-12 text-primary-light mb-6 opacity-50" />
          <p className="text-2xl md:text-4xl font-heading font-bold italic mb-6 leading-tight">
            "We realize the importance of our voices only when we are silenced."
          </p>
          <p className="text-lg text-primary-light font-bold uppercase tracking-widest">
            — Malala Yousafzai
          </p>
        </div>
      </section>
    </div>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 32 32" {...props}>
      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
    </svg>
  );
}