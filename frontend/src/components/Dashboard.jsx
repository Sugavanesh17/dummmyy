import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        const response = await axios.get(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5000"}`}/api/vitals/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(response.data);
      } catch (err) {
        console.error('Failed to fetch timeline for dashboard', err);
      }
    };
    fetchHistory();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto', animation: 'fadeUp 0.6s ease-out' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div className="auth-logo">VitalSense Central</div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            className="btn-primary" 
            onClick={() => navigate('/profile')} 
            style={{ padding: '0.5rem 1.5rem', marginTop: 0, background: 'transparent', border: '1px solid var(--neon-secondary)' }}
          >
            Profile
          </button>
          <button 
            className="btn-primary" 
            onClick={handleLogout} 
            style={{ padding: '0.5rem 1.5rem', marginTop: 0 }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div 
          className="auth-card" 
          style={{ 
            animation: 'none', 
            margin: 0, 
            padding: '2rem', 
            cursor: 'pointer', 
            transition: 'transform 0.2s ease',
            border: '1px solid rgba(0, 240, 255, 0.3)'
          }}
          onClick={() => navigate('/record-vitals')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, color: 'var(--neon-primary)' }}>Enter Vital Data</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--neon-primary)' }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Click here to manually input your detailed health metrics including sleep, vitals, and lifestyle factors.</p>
        </div>

        <div 
          className="auth-card" 
          style={{ 
            animation: 'none', 
            margin: 0, 
            padding: '2rem', 
            cursor: 'pointer', 
            transition: 'transform 0.2s ease',
            border: '1px solid rgba(176, 38, 255, 0.3)'
          }}
          onClick={() => navigate('/timeline')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, color: 'var(--neon-secondary)' }}>Medical Timeline</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--neon-secondary)' }}><polyline points="12 8 12 12 14 14"></polyline><circle cx="12" cy="12" r="10"></circle></svg>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Analyze your historic biometric synchronizations and chronologs.</p>
        </div>
      </div>

      {history.length >= 5 ? (
        <div className="auth-card" style={{ marginTop: '2rem', maxWidth: 'none', animation: 'fadeUp 0.8s ease-out' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#fff', textAlign: 'center' }}>Holistic Biometric Analysis</h2>
          <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer>
              <LineChart data={[...history].reverse()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="createdAt" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }} 
                  labelFormatter={(label) => new Date(label).toLocaleString()}
                />
                <Legend />
                <Line type="monotone" dataKey="heartRate" name="Heart Rate" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="systolicBP" name="Sys BP" stroke="#00F0FF" strokeWidth={2} />
                <Line type="monotone" dataKey="diastolicBP" name="Dia BP" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="sleepDuration" name="Sleep (hrs)" stroke="#B026FF" strokeWidth={2} />
                <Line type="monotone" dataKey="screenTime" name="Screen (hrs)" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="waterIntake" name="Water (L)" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="dietScore" name="Diet (1-10)" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="sedentaryHours" name="Sedentary (hrs)" stroke="#64748b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Please log at least 5 vital entries to unlock the holistic biometric graph analysis. ({history.length}/5 collected)</p>
        </div>
      )}

      {history.length > 0 && history[0].riskClassification && history[0].riskClassification !== "Unknown Risk" && (
        <div className="auth-card" style={{ marginTop: '2rem', maxWidth: 'none', animation: 'fadeUp 1s ease-out' }}>
           <h2 style={{ marginBottom: '1rem', color: '#fff', textAlign: 'center' }}>Latest AI Medical Diagnosis</h2>
           <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid var(--neon-secondary)', textAlign: 'center' }}>
             <div style={{ fontSize: '1rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Based on Entry: {new Date(history[0].createdAt).toLocaleString()}</div>
             <div style={{ fontSize: '2rem', color: history[0].riskClassification.includes('High') ? '#ef4444' : 'var(--neon-primary)', fontWeight: 'bold' }}>
               {history[0].riskClassification}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
