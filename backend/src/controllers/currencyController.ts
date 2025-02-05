import express from "express";
import Currency, { CurrencyEnums } from "../models/Currency.js";

const getAllCurrencies = async (
  _req: express.Request,
  res: express.Response
) => {
  const allCurrencies = await Currency.find();
  if (!allCurrencies) return res.status(400).json({ error: "No data found!" });

  return res.status(200).json(allCurrencies);
};

const getOneCurrency = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const currency = await Currency.findById(id);

  if (!currency) return res.status(400).json({ error: "No data found!" });
  return res.status(200).json(currency);
};

const createCurrency = async (req: express.Request, res: express.Response) => {
  const { from, to, rate } = req.body;
  if (
    !Object.values(CurrencyEnums).includes(from) ||
    !Object.values(CurrencyEnums).includes(to)
  ) {
    return res.status(400).json({ error: "Invalid currency" });
  }

  const exists = await Currency.findOne({ from: from, to: to });
  const reverseExists = await Currency.findOne({ from: to, to: from });
  if (exists || reverseExists) {
    return res.status(400).json({ error: "Currency pair already exist" });
  }

  const newCurrency = new Currency({ from, to, rate });
  await newCurrency.save();

  return res.status(201).json(newCurrency);
};

const updateCurrency = async (req: express.Request, res: express.Response) => {
  const { _id, from, to, rate } = req.body;
  const currency = await Currency.findOne({ _id, from, to });

  if (!currency) {
    return res.status(400).json({ error: "Currency pair doesn't exist" });
  }
  currency.rate = rate;
  await currency.save();

  return res.status(200).json(currency);
};

const deleteCurrency = async (req: express.Request, res: express.Response) => {
  const { _id, from, to } = req.body;
  const currency = await Currency.findOne({ _id, from, to });
  if (!currency) {
    return res.status(400).json({ error: "Currency pair doesn't exist" });
  }

  const result = await currency.deleteOne();
  if (result.deletedCount === 0) {
    return res.status(400).json({ error: "Failed to delete currency pair" });
  }

  return res.status(200).json({ message: "Successfully deleted" });
};

export {
  getAllCurrencies,
  getOneCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
