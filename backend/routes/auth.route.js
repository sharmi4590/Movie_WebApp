import express from "express";
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js";
//import {addFavorite, getFavorites, removeFavorite} from "../controllers/favourites.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
//router.post("/add/:movieId", protectRoute, addFavorite);
router.get("/authCheck", protectRoute, authCheck);

export default router;
