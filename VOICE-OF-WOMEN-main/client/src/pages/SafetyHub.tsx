import { Phone, Users, ShieldAlert, Scale, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function SafetyHub() {
  const helplines = [
    { name: 'Women Helpline', number: '181', desc: 'Domestic Abuse', url: 'tel:181' },
    { name: 'Police', number: '100', desc: 'Immediate Emergency', url: 'tel:100' },
    { name: 'Cyber Crime', number: '1930', desc: 'Online Harassment', url: 'https://cybercrime.gov.in/' },
    { name: 'NCW India', number: '7827170170', desc: 'WhatsApp Helpline', url: 'http://ncw.nic.in/' }
  ];

  const [trustedContacts, setTrustedContacts] = useState([
    { name: 'Mom', phone: '+91 9876543210' },
    { name: 'Ravi (Brother)', phone: '+91 9123456780' }
  ]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContactName && newContactPhone) {
      setTrustedContacts([...trustedContacts, { name: newContactName, phone: newContactPhone }]);
      setNewContactName('');
      setNewContactPhone('');
      setShowAddContact(false);
    }
  };

  const removeContact = (index: number) => {
    setTrustedContacts(trustedContacts.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 pb-32">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
          <ShieldAlert className="h-8 w-8 text-red-500" />
          Safety Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your trusted network and access emergency resources.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Helplines Section */}
        <section className="card">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
            <Phone className="text-accent" /> National Helplines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {helplines.map((line, i) => (
              <a href={line.url} target={line.url.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" key={i} className="flex flex-col p-4 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group">
                <span className="text-red-600 dark:text-red-400 font-bold text-2xl group-hover:scale-105 transition-transform">{line.number}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{line.name}</span>
                <span className="text-sm text-gray-500">{line.desc}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Trusted Contacts */}
        <section className="card border-l-4 border-l-secondary">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
              <Users className="text-secondary-dark" /> Trusted Contacts
            </h2>
            <button onClick={() => setShowAddContact(!showAddContact)} className="text-sm border border-secondary-DEFAULT text-secondary-dark px-2 py-1 rounded-lg font-medium hover:bg-secondary-light">
              {showAddContact ? 'Cancel' : '+ Add Contact'}
            </button>
          </div>
          
          {showAddContact && (
            <form onSubmit={handleAddContact} className="mb-4 flex gap-2">
              <input type="text" placeholder="Name" value={newContactName} onChange={(e) => setNewContactName(e.target.value)} className="flex-1 input-field py-2 text-sm" required />
              <input type="tel" placeholder="Phone" value={newContactPhone} onChange={(e) => setNewContactPhone(e.target.value)} className="flex-1 input-field py-2 text-sm" required />
              <button type="submit" className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark"><Plus size={18} /></button>
            </form>
          )}

          <div className="space-y-3">
            {trustedContacts.map((contact, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark rounded-lg border border-transparent hover:border-gray-200">
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-200">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button className="btn-outline px-3 py-1 text-sm bg-white">Alert</button>
                  <button onClick={() => removeContact(i)} className="p-1 px-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                </div>
              </div>
            ))}
            {trustedContacts.length === 0 && (
              <p className="text-gray-500 text-sm py-4 italic">No trusted contacts added. Please add at least one.</p>
            )}
          </div>
        </section>

      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Legal Rights Widget */}
        <section className="card bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-dark-card border-l-4 border-l-indigo-400">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-900 dark:text-indigo-200">
            <Scale className="text-indigo-500" /> Know Your Rights
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-indigo-500 font-bold">•</span>
              <div><strong>Zero FIR:</strong> You can file an FIR at any police station, irrespective of jurisdiction.</div>
            </li>
            <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-indigo-500 font-bold">•</span>
              <div><strong>No Arrest After Sunset:</strong> A woman cannot be arrested after sunset and before sunrise.</div>
            </li>
            <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-indigo-500 font-bold">•</span>
              <div><strong>Right to Virtual Complaints:</strong> You can file a complaint via email or registered post if you can't go to a station.</div>
            </li>
          </ul>
          <a href="http://ncw.nic.in/important-links/important-laws-related-women" target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            Read Full Guide &rarr;
          </a>
        </section>

        {/* Safety Awareness */}
        <section className="card">
           <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">Anonymous Incident Reporting</h2>
           <p className="text-sm text-gray-600 mb-6 text-center">
             Report harassment or abuse securely. Your privacy is protected, and reports go directly to verified NGOs and authorities.
           </p>
           <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="w-full btn-secondary flex items-center justify-center gap-2">
             <ShieldAlert size={18} /> File Anonymous Report
           </a>
        </section>

        {/* Self Defense Videos */}
        <section className="card bg-red-50/30">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <ShieldAlert className="text-red-500" /> Self-Defense Techniques
          </h2>
          <div className="grid sm:grid-cols-1 gap-4">
            <a href="https://www.youtube.com/results?search_query=women+self+defense+basics" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-gray-100 dark:border-gray-800">
              <div className="h-40 bg-gray-200 relative flex items-center justify-center">
                 <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform shadow-lg text-white pl-1">▶</div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 text-sm">Basic Escape Moves</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Learn how to instantly break free from wrist grabs and chokes.</p>
              </div>
            </a>
            <a href="https://www.youtube.com/results?search_query=krav+maga+for+women" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-gray-100 dark:border-gray-800">
              <div className="h-40 bg-gray-200 relative flex items-center justify-center">
                 <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform shadow-lg text-white pl-1">▶</div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 text-sm">Krav Maga for Women</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Practical street combat and striking techniques for rapid defense.</p>
              </div>
            </a>
            <a href="https://www.youtube.com/results?search_query=pepper+spray+usage+guide" target="_blank" rel="noopener noreferrer" className="block bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-gray-100 dark:border-gray-800">
              <div className="h-40 bg-gray-200 relative flex items-center justify-center">
                 <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:scale-110 transition-transform shadow-lg text-white pl-1">▶</div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 text-sm">Everyday Carry Tools</h4>
                <p className="text-xs text-gray-500 line-clamp-2">How to correctly use pepper spray, alarms, and tactical pens.</p>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
