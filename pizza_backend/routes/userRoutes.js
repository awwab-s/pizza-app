import express from 'express';
import { registerUser, loginUser, updateUserAddress, getUserById, removeFavorite, addFavorite } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id/address', updateUserAddress);
router.get('/:id', getUserById);
router.put('/:id/favorites/remove', removeFavorite);
router.put('/:id/favorites/add', addFavorite);

export default router;
