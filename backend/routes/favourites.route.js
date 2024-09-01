// routes/favorite.route.js
import express from 'express';
import { addFavorite, removeFavorite } from '../controllers/favorite.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/add', protectRoute, addFavorite);
router.post('/remove', protectRoute, removeFavorite);

export default router;