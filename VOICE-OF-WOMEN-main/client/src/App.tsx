import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AadhaarVerify from './pages/AadhaarVerify';
import Home from './pages/Home';
import SafetyHub from './pages/SafetyHub';
import EducationHub from './pages/EducationHub';
import EconomyHub from './pages/EconomyHub';
import HealthcareHub from './pages/HealthcareHub';
import Chatbot from './pages/Chatbot';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import InspirationHub from './pages/InspirationHub';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SosButton from './components/layout/SosButton';
import Navbar from './components/layout/Navbar';
import ProtectedRoute, { AdminRoute } from './components/auth/AuthRoutes';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-[#FAF0E6] dark:bg-dark text-gray-800 dark:text-gray-200">
        <Navbar />
        <div className="pt-24 pb-20">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/aadhaar-verify" element={<ProtectedRoute><AadhaarVerify /></ProtectedRoute>} />
          <Route path="/safety" element={<ProtectedRoute><SafetyHub /></ProtectedRoute>} />
          <Route path="/education" element={<ProtectedRoute><EducationHub /></ProtectedRoute>} />
          <Route path="/economy" element={<ProtectedRoute><EconomyHub /></ProtectedRoute>} />
          <Route path="/health" element={<ProtectedRoute><HealthcareHub /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/inspiration" element={<ProtectedRoute><InspirationHub /></ProtectedRoute>} />
        </Routes>
        </div>
        <SosButton />
      </div>
    </Router>
  );
}

export default App;
