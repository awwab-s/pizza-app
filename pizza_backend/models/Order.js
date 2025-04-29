import mongoose from 'mongoose';

const pizzaOrderedSchema = new mongoose.Schema({
  crust: String,
  imageURL: String,
  item_no: Number,
  name: String,
  pizza_id: Number,
  price: Number,
  quantity: Number,
  size: String,
  toppings: [String],
}, { _id: false });

const orderSchema = new mongoose.Schema({
  delivery_address: { type: String, required: true },
  order_id: { type: Number, required: true },
  order_time: { type: Date, required: true },
  phone_number: { type: String, required: true },
  pizzas_ordered: [pizzaOrderedSchema],
  status: { type: String, default: "Pending" },
  total_bill: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // linking to users
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema, 'orders'); // collection 'orders'

export default Order;
