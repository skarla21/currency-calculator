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
  [Currency.DKK]: "🇩🇰 - Denmark - Krone",
  [Currency.PLN]: "🇵🇱 - Poland - Zloty",
  [Currency.THB]: "🇹🇭 - Thailand - Baht",
  [Currency.IDR]: "🇮🇩 - Indonesia - Rupiah",
  [Currency.MYR]: "🇲🇾 - Malaysia - Ringgit",
  [Currency.PHP]: "🇵🇭 - Philippines - Peso",
  [Currency.VND]: "🇻🇳 - Vietnam - Dong",
  [Currency.ILS]: "🇮🇱 - Israel - New Shekel",
  [Currency.AED]: "🇦🇪 - United Arab Emirates - Dirham",
  [Currency.SAR]: "🇸🇦 - Saudi Arabia - Riyal",
  [Currency.QAR]: "🇶🇦 - Qatar - Riyal",
  [Currency.KWD]: "🇰🇼 - Kuwait - Dinar",
  [Currency.BHD]: "🇧🇭 - Bahrain - Dinar",
  [Currency.OMR]: "🇴🇲 - Oman - Rial",
  [Currency.JOD]: "🇯🇴 - Jordan - Dinar",
  [Currency.EGP]: "🇪🇬 - Egypt - Pound",
  [Currency.NGN]: "🇳🇬 - Nigeria - Naira",
  [Currency.COP]: "🇨🇴 - Colombia - Peso",
  [Currency.PEN]: "🇵🇪 - Peru - Sol",
  [Currency.CLP]: "🇨🇱 - Chile - Peso",
  [Currency.ISK]: "🇮🇸 - Iceland - Krona",
  [Currency.RON]: "🇷🇴 - Romania - Leu",
  [Currency.HRK]: "🇭🇷 - Croatia - Kuna",
  [Currency.CZK]: "🇨🇿 - Czech Republic - Koruna",
  [Currency.HUF]: "🇭🇺 - Hungary - Forint",
  [Currency.BGN]: "🇧🇬 - Bulgaria - Lev",
  [Currency.LKR]: "🇱🇰 - Sri Lanka - Rupee",
  [Currency.PKR]: "🇵🇰 - Pakistan - Rupee",
  [Currency.DOP]: "🇩🇴 - Dominican Republic - Peso",
  [Currency.ARS]: "🇦🇷 - Argentina - Peso",
};
