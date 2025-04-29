import express from 'express';
import { getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

router.get('/user/:userId', getUserOrders);

export default router;
