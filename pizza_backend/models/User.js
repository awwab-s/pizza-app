import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: "" },
  photoURL: { type: String, default: "" },
  favorites: { type: [String], default: [] },
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'users'); // 'users' collection

export default User;
