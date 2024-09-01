// controllers/favorite.controller.js
import { User } from '../models/user.model.js';

export const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.favorites.includes(movieId)) {
      return res.status(400).json({ success: false, message: 'Movie already in favorites' });
    }

    user.favorites.push(movieId);
    await user.save();

    res.status(200).json({ success: true, message: 'Movie added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.favorites = user.favorites.filter(fav => fav !== movieId);
    await user.save();

    res.status(200).json({ success: true, message: 'Movie removed from favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};