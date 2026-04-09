import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    sparse: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  bmi: {
    type: Number,
  },
  familyHistory: {
    type: String,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
