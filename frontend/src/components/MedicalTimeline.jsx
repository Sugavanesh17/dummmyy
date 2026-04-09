import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MedicalTimeline = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || "http://localhost:5000"}`}/api/vitals/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response && (err.response.status === 401 || err.response.status === 500)) {
          localStorage.removeItem('auth_token');
          navigate('/login');
        } else {
          setError('Failed to load timeline. Please ensure the backend is connected.');
          setLoading(false);
        }
      }
    };

    fetchHistory();
  }, [navigate]);

  return (
    <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto', animation: 'fadeUp 0.6s ease-out' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div className="auth-logo">Medical Timeline</div>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/dashboard')} 
          style={{ padding: '0.5rem 1.5rem', marginTop: 0, background: 'transparent', border: '1px solid var(--text-muted)' }}
        >
          Back to Central
        </button>
      </header>

      {error && <div style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '2rem' }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '3rem' }}>Decrypting chronolog...</div>
      ) : history.length === 0 ? (
        <div className="auth-card" style={{ margin: '0 auto', textAlign: 'center', animation: 'none' }}>
          <h3 style={{ color: 'var(--neon-primary)', marginBottom: '1rem' }}>No Data Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>You have no recorded vital entries yet. Head back to the dashboard to log your first dataset.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {history.map((record, index) => (
            <div key={record._id || index} className="auth-card" style={{ margin: 0, padding: '2rem', animation: 'none', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--neon-secondary)', fontWeight: 'bold' }}>
                  Entry #{history.length - index}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {new Date(record.createdAt).toLocaleString()}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
                {record.riskClassification && record.riskClassification !== "Unknown Risk" && (
                  <div style={{ gridColumn: '1 / -1', marginBottom: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--neon-secondary)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>🧠 AI Medical Prediction</div>
                    <div style={{ fontSize: '1.3rem', color: record.riskClassification.includes('High') ? '#ef4444' : 'var(--neon-primary)', fontWeight: 'bold' }}>
                      {record.riskClassification}
                    </div>
                  </div>
                )}
                {record.sleepDuration && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Sleep Duration</div><div>{record.sleepDuration} hrs</div></div>}
                {record.qualityOfSleep && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Quality of Sleep</div><div>{record.qualityOfSleep}</div></div>}
                {record.physicalActivityLevel && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Activity Level</div><div>{record.physicalActivityLevel}</div></div>}
                {record.stressLevel && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Stress Level</div><div>{record.stressLevel}</div></div>}
                {record.bmiCategory && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>BMI Category</div><div>{record.bmiCategory}</div></div>}
                {record.systolicBP && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Systolic BP</div><div>{record.systolicBP} mmHg</div></div>}
                {record.diastolicBP && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Diastolic BP</div><div>{record.diastolicBP} mmHg</div></div>}
                {record.heartRate && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Heart Rate</div><div>{record.heartRate} bpm</div></div>}
                {record.screenTime && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Screen Time</div><div>{record.screenTime} hrs</div></div>}
                {record.waterIntake && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Water Intake</div><div>{record.waterIntake} L</div></div>}
                {record.smoking && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Smoking</div><div>{record.smoking}</div></div>}
                {record.alcohol && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Alcohol</div><div>{record.alcohol}</div></div>}
                {record.dietScore && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Diet Score</div><div>{record.dietScore} / 10</div></div>}
                {record.sedentaryHours && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Sedentary Hrs</div><div>{record.sedentaryHours}</div></div>}
                {record.exerciseFrequency && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Exercise Freq</div><div>{record.exerciseFrequency}</div></div>}
                {record.sleepConsistency && <div><div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Sleep Consistency</div><div>{record.sleepConsistency}</div></div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalTimeline;
