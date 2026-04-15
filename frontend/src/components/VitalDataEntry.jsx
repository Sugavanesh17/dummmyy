import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const VitalDataEntry = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    sleepDuration: '',
    qualityOfSleep: '',
    physicalActivityLevel: '',
    stressLevel: '',
    bmiCategory: '',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    screenTime: '',
    waterIntake: '',
    smoking: '',
    alcohol: '',
    dietScore: '',
    sedentaryHours: '',
    exerciseFrequency: '',
    sleepConsistency: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post(`${API_BASE_URL}/api/vitals/record`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setLoading(false);
      setMessage('Vital data saved to MongoDB securely!');
      
      setTimeout(() => {
        setMessage(null);
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage('Failed to save data. Make sure backend is running and Compass is connected.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '800px', width: '100%', margin: '2rem 0' }}>
        <div className="auth-header">
          <div className="auth-logo">Enter Vital Data</div>
          <p className="auth-subtitle">Record your comprehensive health metrics.</p>
        </div>

        {message && <div style={{ color: '#00F0FF', marginBottom: '1rem', textAlign: 'center' }}>{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            
            {/* Numeric Inputs */}
            <div className="input-group">
              <label htmlFor="sleepDuration">Sleep Duration (hrs)</label>
              <input type="number" step="0.5" id="sleepDuration" name="sleepDuration" value={formData.sleepDuration} onChange={handleChange} placeholder="e.g. 7.5" required />
            </div>

            <div className="input-group">
              <label htmlFor="systolicBP">Systolic BP (mmHg)</label>
              <input type="number" id="systolicBP" name="systolicBP" value={formData.systolicBP} onChange={handleChange} placeholder="120" required />
            </div>

            <div className="input-group">
              <label htmlFor="diastolicBP">Diastolic BP (mmHg)</label>
              <input type="number" id="diastolicBP" name="diastolicBP" value={formData.diastolicBP} onChange={handleChange} placeholder="80" required />
            </div>

            <div className="input-group">
              <label htmlFor="heartRate">Heart Rate (bpm)</label>
              <input type="number" id="heartRate" name="heartRate" value={formData.heartRate} onChange={handleChange} placeholder="72" required />
            </div>

            <div className="input-group">
              <label htmlFor="screenTime">Screen Time (hrs)</label>
              <input type="number" step="0.5" id="screenTime" name="screenTime" value={formData.screenTime} onChange={handleChange} placeholder="e.g. 6.5" required />
            </div>

            <div className="input-group">
              <label htmlFor="waterIntake">Water Intake (L)</label>
              <input type="number" step="0.1" id="waterIntake" name="waterIntake" value={formData.waterIntake} onChange={handleChange} placeholder="e.g. 2.5" required />
            </div>

            <div className="input-group">
              <label htmlFor="dietScore">Diet Score (1-10)</label>
              <input type="number" min="1" max="10" id="dietScore" name="dietScore" value={formData.dietScore} onChange={handleChange} placeholder="e.g. 7" required />
            </div>

            <div className="input-group">
              <label htmlFor="sedentaryHours">Sedentary Hours</label>
              <input type="number" step="0.5" id="sedentaryHours" name="sedentaryHours" value={formData.sedentaryHours} onChange={handleChange} placeholder="e.g. 8" required />
            </div>

            {/* Dropdown Inputs */}
            <div className="input-group">
              <label htmlFor="qualityOfSleep">Quality of Sleep</label>
              <select id="qualityOfSleep" name="qualityOfSleep" value={formData.qualityOfSleep} onChange={handleChange} required className="vital-select">
                <option value="" disabled>Select Quality</option>
                <option value="Poor">Poor</option>
                <option value="Fair">Fair</option>
                <option value="Good">Good</option>
                <option value="Excellent">Excellent</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="physicalActivityLevel">Physical Activity</label>
              <select id="physicalActivityLevel" name="physicalActivityLevel" value={formData.physicalActivityLevel} onChange={handleChange} required className="vital-select">
                <option value="" disabled>Select Level</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Lightly Active">Lightly Active</option>
                <option value="Moderately Active">Moderately Active</option>
                <option value="Very Active">Very Active</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="stressLevel">Stress Level</label>
              <select id="stressLevel" name="stressLevel" value={formData.stressLevel} onChange={handleChange} required className="vital-select">
                <option value="" disabled>Select Level</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Severe">Severe</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bmiCategory">BMI Category</label>
              <select id="bmiCategory" name="bmiCategory" value={formData.bmiCategory} onChange={handleChange} required className="vital-select">
                <option value="" disabled>Select Category</option>
                <option value="Underweight">Underweight</option>
                <option value="Normal">Normal</option>
                <option value="Overweight">Overweight</option>
                <option value="Obese">Obese</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="smoking">Smoking</label>
              <select id="smoking" name="smoking" value={formData.smoking} onChange={handleChange} required className="vital-select">
                <option value="" disabled>Select Usage</option>
                <option value="Never">Never</option>
                <option value="Former">Former</option>
                <option value="Current">Current</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="alcohol">Alcohol</label>
              <select id="alcohol" name="alcohol" value={formData.alcohol} onChange={handleChange} required className="vital-select">
                <option value="" disabled>Select Usage</option>
                <option value="Never">Never</option>
                <option value="Occasionally">Occasionally</option>
                <option value="Frequently">Frequently</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="exerciseFrequency">Exercise Frequency</label>
              <select id="exerciseFrequency" name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} required className="vital-select">
                <option value="" disabled>Select Frequency</option>
                <option value="Rarely">Rarely</option>
                <option value="1-2 times/week">1-2 times/week</option>
                <option value="3-4 times/week">3-4 times/week</option>
                <option value="Daily">Daily</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="sleepConsistency">Sleep Consistency</label>
              <select id="sleepConsistency" name="sleepConsistency" value={formData.sleepConsistency} onChange={handleChange} required className="vital-select">
                <option value="" disabled>Select Consistency</option>
                <option value="Very Irregular">Very Irregular</option>
                <option value="Somewhat Irregular">Somewhat Irregular</option>
                <option value="Consistent">Consistent</option>
              </select>
            </div>

          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="button" className="btn-primary" onClick={() => navigate('/dashboard')} style={{ flex: 1, background: 'transparent', border: '1px solid var(--text-muted)' }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1, marginTop: 0 }}>
              {loading ? 'Saving...' : 'Submit Data'}
            </button>
          </div>

        </form>
      </div>

      <style>{`
        .vital-select {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          color: white;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          transition: all 0.3s ease;
          appearance: none;
        }
        .vital-select:focus {
          outline: none;
          border-color: var(--neon-primary);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
        }
        .vital-select option {
          background: var(--bg-dark);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default VitalDataEntry;
