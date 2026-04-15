import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const ProfileSetup = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(`${API_BASE_URL}/api/auth/profile`, 
        { username, age, gender, bmi, familyHistory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLoading(false);
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile. Make sure the backend connects to MongoDB.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Profile Details</div>
          <p className="auth-subtitle">Let's finish setting up your identity.</p>
        </div>

        {error && <div style={{ color: '#ff4d4d', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="e.g. cyberdoc99"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="age">Age</label>
              <input 
                type="number" 
                id="age" 
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="gender">Gender</label>
              <select 
                id="gender" 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="bmi">BMI</label>
              <input 
                type="number" 
                step="0.1"
                id="bmi" 
                placeholder="e.g. 22.5"
                value={bmi}
                onChange={(e) => setBmi(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="familyHistory">Family Medical History</label>
            <input 
              type="text" 
              id="familyHistory" 
              placeholder="e.g. None, Diabetes, etc."
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
