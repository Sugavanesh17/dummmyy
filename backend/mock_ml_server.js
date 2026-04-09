import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/predict', (req, res) => {
    console.log("Mock ML received data:", req.body);
    
    // Quick mock logic for realistic testing
    let risk_classification = "High Risk - Medical Review Advised";
    const { systolicBP, diastolicBP, sleepDuration } = req.body;
    
    if (systolicBP < 130 && diastolicBP < 85 && sleepDuration >= 6) {
        risk_classification = "Low Risk - Healthy Vitals";
    }

    res.json({
        status: "success",
        risk_classification: risk_classification
    });
});

app.listen(5001, () => console.log("Mock Colab ML Server running locally on port 5001"));
