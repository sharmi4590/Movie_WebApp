
import express from 'express';
import SearchHistory from '../models/searchHistory.model.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();


router.post('/add', protectRoute, async (req, res) => {
  const userId = req.user._id; 
  const { searchTerm } = req.body;

  try {
    let history = await SearchHistory.findOne({ userId });

    if (!history) {
      history = new SearchHistory({ userId, searches: [] });
    }

    if (!history.searches.includes(searchTerm)) {
      history.searches.push(searchTerm);
      await history.save();
    }

    res.json({ message: 'Search term added', searches: history.searches });
  } catch (error) {
    res.status(500).json({ message: 'Error adding search term', error });
  }
});


router.get('/', protectRoute, async (req, res) => {
  const userId = req.user._id;

  try {
    const history = await SearchHistory.findOne({ userId });

    if (!history) {
      return res.json({ searches: [] });
    }

    res.json({ searches: history.searches });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search history', error });
  }
});


router.delete('/', protectRoute, async (req, res) => {
  const userId = req.user._id;

  try {
    await SearchHistory.findOneAndDelete({ userId });
    res.json({ message: 'Search history cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing search history', error });
  }
});

export default router;
