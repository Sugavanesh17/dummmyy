import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) return;
        
        const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = response.data;
        setName(data.name || '');
        setEmail(data.email || '');
        setUsername(data.username || '');
        setAge(data.age || '');
        setGender(data.gender || '');
        setBmi(data.bmi || '');
        setFamilyHistory(data.familyHistory || '');
      } catch (err) {
        console.error("Could not fetch profile from server", err);
        // If unauthorized or token verification fails, clear it and redirect
        if (err.response && (err.response.status === 401 || err.response.status === 500)) {
          localStorage.removeItem('auth_token');
          navigate('/login');
        }
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(`${API_BASE_URL}/api/auth/profile`, 
        { name, username, age, gender, bmi, familyHistory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLoading(false);
      setMessage('Profile settings updated securely in MongoDB!');
      setIsEditing(false); // Return to view mode
      setTimeout(() => setMessage(null), 3000); // Clear message
      
    } catch (err) {
      console.error(err);
      setMessage('Failed to update. Make sure backend is running.');
      setLoading(false);
    }
  };

  const PenIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" height="20" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round"
      style={{ cursor: 'pointer', color: 'var(--neon-primary)', marginLeft: '10px' }}
      onClick={() => setIsEditing(true)}
    >
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  );

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="auth-logo">Profile Details</div>
            {!isEditing && <PenIcon />}
          </div>
          <p className="auth-subtitle">
            {isEditing ? 'Update your VitalSense identity.' : 'Your secure digital identity.'}
          </p>
        </div>

        {message && <div style={{ color: '#00F0FF', marginBottom: '1rem', textAlign: 'center' }}>{message}</div>}

        {!isEditing ? (
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Full Name</div>
                  <div style={{ fontSize: '1.1rem', color: '#fff' }}>{name || 'Not provided'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Email Account</div>
                  <div style={{ fontSize: '1.1rem', color: '#fff' }}>{email || 'Not provided'}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Username</div>
                  <div style={{ fontSize: '1.1rem', color: '#fff' }}>{username || 'Not set'}</div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Age</div>
                    <div style={{ fontSize: '1.1rem', color: '#fff' }}>{age || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Gender</div>
                    <div style={{ fontSize: '1.1rem', color: '#fff' }}>{gender || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>BMI</div>
                    <div style={{ fontSize: '1.1rem', color: '#fff' }}>{bmi || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Family Medical History</div>
                <div style={{ fontSize: '1.1rem', color: '#fff' }}>{familyHistory || 'None recorded'}</div>
              </div>

              <button type="button" className="btn-primary" onClick={() => navigate('/dashboard')} style={{ marginTop: '2rem' }}>
                Return to Dashboard
              </button>
           </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="input-group" style={{ flex: 1 }}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  required 
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="input-group" style={{ flex: 1 }}>
                <label htmlFor="age">Age</label>
                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
              
              <div className="input-group" style={{ flex: 1 }}>
                <label htmlFor="gender">Gender</label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="input-group" style={{ flex: 1 }}>
                <label htmlFor="bmi">BMI</label>
                <input type="number" step="0.1" id="bmi" value={bmi} onChange={(e) => setBmi(e.target.value)} required />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="familyHistory">Family Medical History</label>
              <input type="text" id="familyHistory" value={familyHistory} onChange={(e) => setFamilyHistory(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" className="btn-primary" onClick={() => setIsEditing(false)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--text-muted)' }}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1, marginTop: 0 }}>
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
