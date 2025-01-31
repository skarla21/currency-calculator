export interface ICurrencyExchange {
  _id: string;
  from: Currency;
  to: Currency;
  rate: number;
}

export enum Currency {
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
}

export const CURRENCY_DISPLAY: Record<Currency, string> = {
  [Currency.USD]: "🇺🇸 - United States - Dollar",
  [Currency.EUR]: "🇪🇺 - European Union - Euro",
  [Currency.GBP]: "🇬🇧 - United Kingdom - Pound",
  [Currency.JPY]: "🇯🇵 - Japan - Yen",
  [Currency.AUD]: "🇦🇺 - Australia - Dollar",
  [Currency.CAD]: "🇨🇦 - Canada - Dollar",
  [Currency.CHF]: "🇨🇭 - Switzerland - Franc",
  [Currency.CNY]: "🇨🇳 - China - Yuan",
  [Currency.SEK]: "🇸🇪 - Sweden - Krona",
  [Currency.NZD]: "🇳🇿 - New Zealand - Dollar",
  [Currency.MXN]: "🇲🇽 - Mexico - Peso",
  [Currency.SGD]: "🇸🇬 - Singapore - Dollar",
  [Currency.HKD]: "🇭🇰 - Hong Kong - Dollar",
  [Currency.NOK]: "🇳🇴 - Norway - Krone",
  [Currency.KRW]: "🇰🇷 - South Korea - Won",
  [Currency.TRY]: "🇹🇷 - Turkey - Lira",
  [Currency.RUB]: "🇷🇺 - Russia - Ruble",
  [Currency.INR]: "🇮🇳 - India - Rupee",
  [Currency.BRL]: "🇧🇷 - Brazil - Real",
  [Currency.ZAR]: "🇿🇦 - South Africa - Rand",
};
