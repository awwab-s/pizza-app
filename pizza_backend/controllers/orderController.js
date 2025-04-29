import Order from '../models/Order.js';

// Get all orders by user ID
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user_id: userId }).sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    next(error);
  }
};
