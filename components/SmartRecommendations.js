import React, { useState, useEffect } from 'react';
import { getSmartRecommendations } from '../services/aiService';
import './SmartRecommendations.css';

const SmartRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [healthConcerns, setHealthConcerns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    if (userId && healthConcerns.length > 0) {
      const controller = new AbortController();
      setAbortController(controller);
      fetchRecommendations(controller.signal);
      return () => controller.abort();
    }
  }, [userId, healthConcerns]);

  useEffect(() => {
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, []);

  const fetchRecommendations = async (signal) => {
    setLoading(true);
    try {
      const data = await getSmartRecommendations(userId, healthConcerns, signal);
      if (!signal.aborted) {
        setRecommendations(data);
      }
    } catch (error) {
      if (!signal.aborted) {
        console.error('Error fetching recommendations:', error);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  const handleHealthConcernChange = (concern) => {
    setHealthConcerns(prev =>
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };

  const commonHealthConcerns = [
    'Diabetes',
    'Hypertension',
    'Allergies',
    'Heart Disease',
    'Asthma'
  ];

  return (
    <div className="smart-recommendations">
      <h2>Smart Medicine Recommendations</h2>
      <div className="health-concerns">
        <h3>Select Your Health Concerns</h3>
        <div className="concerns-grid">
          {commonHealthConcerns.map(concern => (
            <button
              key={concern}
              className={`concern-btn ${healthConcerns.includes(concern) ? 'active' : ''}`}
              onClick={() => handleHealthConcernChange(concern)}
            >
              {concern}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading recommendations...</div>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map(medicine => (
            <div key={medicine.id} className="medicine-card">
              <img src={medicine.image} alt={medicine.name} />
              <h3>{medicine.name}</h3>
              <p>{medicine.description}</p>
              <div className="medicine-details">
                <span className="price">₹{medicine.price}</span>
                <button className="add-to-cart">Add to Cart</button>
              </div>
              <div className="ai-confidence">
                <span>AI Confidence: {medicine.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;