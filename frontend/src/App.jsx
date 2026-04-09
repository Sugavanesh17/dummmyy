import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProfileSetup from './components/ProfileSetup';
import ProfileSettings from './components/ProfileSettings';
import Dashboard from './components/Dashboard';
import VitalDataEntry from './components/VitalDataEntry';
import MedicalTimeline from './components/MedicalTimeline';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/record-vitals" element={<VitalDataEntry />} />
        <Route path="/timeline" element={<MedicalTimeline />} />
      </Routes>
    </Router>
  );
}

export default App;
