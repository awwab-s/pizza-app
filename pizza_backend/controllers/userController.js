import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please provide all fields');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('Email already in use');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        photoURL: user.photoURL,
        favorites: user.favorites,
        createdAt: user.createdAt,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
          photoURL: user.photoURL,
          favorites: user.favorites,
          createdAt: user.createdAt,
        });
      } else {
        res.status(401);
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      next(error);
    }
};

export const updateUserAddress = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { address } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.address = address;
    await user.save();

    res.json({ message: "Address updated successfully", address: user.address });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { pizzaId } = req.body;

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.favorites = user.favorites.filter(id => id !== pizzaId);
    await user.save();

    res.json({ message: "Favorite removed successfully" });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { pizzaId } = req.body;

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (!user.favorites.includes(pizzaId)) {
      user.favorites.push(pizzaId);
      await user.save();
    }

    res.json({ message: "Favorite added successfully" });
  } catch (error) {
    next(error);
  }
};

