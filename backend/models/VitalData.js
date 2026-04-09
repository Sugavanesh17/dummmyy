import mongoose from 'mongoose';

const vitalDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Made false for currently unauthenticated local mock setups, set to true later if enforcing auth
  },
  sleepDuration: { type: Number },
  qualityOfSleep: { type: String },
  physicalActivityLevel: { type: String },
  stressLevel: { type: String },
  bmiCategory: { type: String },
  systolicBP: { type: Number },
  diastolicBP: { type: Number },
  heartRate: { type: Number },
  screenTime: { type: Number },
  waterIntake: { type: Number },
  smoking: { type: String },
  alcohol: { type: String },
  dietScore: { type: Number },
  sedentaryHours: { type: Number },
  exerciseFrequency: { type: String },
  sleepConsistency: { type: String },
  riskClassification: { type: String }
}, { timestamps: true });

export default mongoose.model('VitalData', vitalDataSchema);
