import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
  currentUser,
  login,
  register,
  logout,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middleware.js";

const router = express.Router();

router.get("/current-user", isLoggedIn, catchAsync(currentUser));
router.post("/register", catchAsync(register));
router.post("/login", catchAsync(login));
router.post("/logout", logout);

export default router;
