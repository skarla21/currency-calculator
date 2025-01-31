import express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
  getAllCurrencies,
  getOneCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from "../controllers/currencyController.js";
import { isLoggedIn } from "../middleware.js";

const router = express.Router();

router.get("/", catchAsync(getAllCurrencies)); // fetch all data

router
  .route("/:id")
  .get(catchAsync(getOneCurrency)) // fetch one
  .put(isLoggedIn, catchAsync(updateCurrency)) // update one
  .delete(isLoggedIn, catchAsync(deleteCurrency)); // delete one

router.post("/new", isLoggedIn, catchAsync(createCurrency)); // create a new one

export default router;
