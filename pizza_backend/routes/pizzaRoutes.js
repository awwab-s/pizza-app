import express from 'express';
import { getPizzas } from '../controllers/pizzaController.js';

const router = express.Router();

// /api/pizzas
router.get('/', getPizzas);

export default router;