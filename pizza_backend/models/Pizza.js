import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: [{ type: String }], // <-- HERE: Array of strings
  image: { type: String },
  prices: [{ type: Number }],   // <-- prices can be an array too
}, { timestamps: true });

const Pizza = mongoose.model('Pizza', pizzaSchema, 'pizzas');

export default Pizza;
