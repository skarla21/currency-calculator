import mongoose from "mongoose";

export enum CurrencyEnums {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  AUD = "AUD",
  CAD = "CAD",
  CHF = "CHF",
  CNY = "CNY",
  SEK = "SEK",
  NZD = "NZD",
  MXN = "MXN",
  SGD = "SGD",
  HKD = "HKD",
  NOK = "NOK",
  KRW = "KRW",
  TRY = "TRY",
  RUB = "RUB",
  INR = "INR",
  BRL = "BRL",
  ZAR = "ZAR",
  DKK = "DKK",
  PLN = "PLN",
  THB = "THB",
  IDR = "IDR",
  MYR = "MYR",
  PHP = "PHP",
  VND = "VND",
  ILS = "ILS",
  AED = "AED",
  SAR = "SAR",
  QAR = "QAR",
  KWD = "KWD",
  BHD = "BHD",
  OMR = "OMR",
  JOD = "JOD",
  EGP = "EGP",
  NGN = "NGN",
  COP = "COP",
  PEN = "PEN",
  CLP = "CLP",
  ISK = "ISK",
  RON = "RON",
  HRK = "HRK",
  CZK = "CZK",
  HUF = "HUF",
  BGN = "BGN",
  LKR = "LKR",
  PKR = "PKR",
  DOP = "DOP",
  ARS = "ARS",
}

export interface ICurrency {
  from: CurrencyEnums;
  to: CurrencyEnums;
  rate: number;
}

const CurrencySchema = new mongoose.Schema<ICurrency>({
  from: {
    type: String,
    enum: Object.values(CurrencyEnums),
    required: true,
  },
  to: {
    type: String,
    enum: Object.values(CurrencyEnums),
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<ICurrency>("Currency", CurrencySchema);
