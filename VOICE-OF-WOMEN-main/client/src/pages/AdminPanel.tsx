import { ShieldAlert, Users, Activity, Settings, UserCheck } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix Leaflet's default icon path issues in React
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function AdminPanel() {
  const activeAlerts = [
    { id: 'ALT-1092', user: 'Ananya S.', zone: 'Andheri West, Mumbai', time: '2 mins ago', helpers: 3, status: 'Active', lat: 19.1136, lng: 72.8697 },
    { id: 'ALT-1091', user: 'Priya K.', zone: 'Bandra, Mumbai', time: '15 mins ago', helpers: 1, status: 'In Progress', lat: 19.0596, lng: 72.8295 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-card">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-dark border-r border-gray-200 dark:border-gray-800 hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold font-heading text-red-600">VOW Control</h2>
        </div>
        <nav className="space-y-1 px-3">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-red-50 text-red-700 rounded-lg font-medium">
            <ShieldAlert size={20} /> SOS Control Room
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg font-medium">
            <Activity size={20} /> Analytics
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg font-medium">
            <Users size={20} /> Users
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg font-medium">
            <Settings size={20} /> Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SOS Control Room</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time monitoring of emergency alerts and helper dispatch.</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/50">
             <h3 className="text-red-800 dark:text-red-400 font-bold mb-1">Active Alerts</h3>
             <p className="text-4xl font-mono text-red-600">2</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-900/50">
             <h3 className="text-green-800 dark:text-green-400 font-bold mb-1">Resolved Today</h3>
             <p className="text-4xl font-mono text-green-600">14</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/50">
             <h3 className="text-blue-800 dark:text-blue-400 font-bold mb-1">Active Helpers</h3>
             <p className="text-4xl font-mono text-blue-600">3,492</p>
          </div>
        </div>

        {/* Live Map Placeholder & Alert List */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white dark:bg-dark p-2 rounded-3xl shadow-sm border border-gray-100 min-h-[400px] overflow-hidden">
             <MapContainer center={[19.0760, 72.8777]} zoom={11} scrollWheelZoom={false} className="w-full h-full min-h-[450px] rounded-2xl z-0">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle center={[19.0760, 72.8777]} radius={10000} pathOptions={{ color: 'red', fillColor: '#fca5a5', fillOpacity: 0.1 }} />
                
                {activeAlerts.map(alert => (
                  <Marker key={alert.id} position={[alert.lat, alert.lng]} icon={customIcon}>
                    <Popup>
                      <div className="font-sans">
                        <p className="font-bold text-red-600 mb-1">SOS: {alert.id}</p>
                        <p className="text-sm">Zone: {alert.zone}</p>
                        <p className="text-sm font-medium">Status: {alert.status}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
             </MapContainer>
          </div>

          <div className="space-y-4">
             <h3 className="font-bold text-lg text-gray-800 dark:text-white">Active Incidents</h3>
             {activeAlerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${alert.status === 'Active' ? 'border-l-red-500 bg-red-50 dark:bg-red-900/10' : 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-500">{alert.id}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white dark:bg-dark drop-shadow-sm">{alert.time}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{alert.zone}</h4>
                  <p className="text-sm text-gray-600 mb-3">Victim: Masked (Aadhaar Verified)</p>
                  
                  <div className="flex justify-between items-center text-sm border-t border-gray-200 dark:border-gray-700 pt-3">
                    <div className="flex items-center gap-1 text-green-700 font-medium">
                       <UserCheck size={16} /> {alert.helpers} Helpers Enroute
                    </div>
                    <button className="text-blue-600 font-bold hover:underline">View Log</button>
                  </div>
                </div>
             ))}
          </div>

        </div>
      </div>
    </div>
  );
}
