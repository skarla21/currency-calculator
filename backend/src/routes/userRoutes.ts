import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
  currentUser,
  login,
  register,
  logout,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/current-user", catchAsync(currentUser));
router.post("/register", catchAsync(register));
router.post("/login", catchAsync(login));
router.post("/logout", logout);

export default router;
