import Pizza from '../models/Pizza.js';

// @desc    Get all pizzas
// @route   GET /api/pizzas
// @access  Public
export const getPizzas = async (req, res, next) => {
  try {
    const pizzas = await Pizza.find().sort({ id: 1 });
    res.json(pizzas);
  } catch (error) {
    next(error); // forward to error handler
  }
};