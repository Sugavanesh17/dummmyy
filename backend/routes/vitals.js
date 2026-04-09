import express from 'express';
import VitalData from '../models/VitalData.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const router = express.Router();

// Record vital data
router.post('/record', async (req, res) => {
  try {
    let userId = null;
    
    // Attempt to extract userId from token if provided
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        // Just ignore invalid token for now and save as anonymous if allowed
        console.log("Token verification failed, saving as anonymous data.");
      }
    }

    let riskClassification = "Unknown Risk";
    try {
      if (process.env.ML_API_URL && process.env.ML_API_URL !== "") {
         const mlResponse = await axios.post(`${process.env.ML_API_URL}/predict`, req.body);
         if (mlResponse.data && mlResponse.data.risk_classification) {
             riskClassification = mlResponse.data.risk_classification;
         }
      }
    } catch (mlError) {
      console.error("Machine Learning API Error:", mlError.message);
      // We fail gracefully to allow local MongoDB saving even if Colab tab is closed
    }

    const newVitalData = new VitalData({
      ...req.body,
      user: userId,
      riskClassification
    });

    const savedData = await newVitalData.save();
    res.status(201).json({ message: 'Vital data saved successfully', data: savedData });
  } catch (error) {
    res.status(500).json({ message: 'Server error saving vital data', error: error.message });
  }
});

// Fetch history of vital data
router.get('/history', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Retrieve sorted history
    const history = await VitalData.find({ user: userId }).sort({ createdAt: -1 });
    
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching history', error: error.message });
  }
});

export default router;
