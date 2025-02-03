import { useState, useMemo } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CurrencySelect from "./CurrencySelect";
import { ICurrencyExchange, Currency } from "../constants/currencies";

interface Props {
  currencyExchanges: ICurrencyExchange[];
}

const CurrencyExchangeCard: React.FC<Props> = ({ currencyExchanges }) => {
  const [amount, setAmount] = useState<number | "">("");
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // check if screen is medium (md) or larger

  // 'from' currency options based on selected 'to'
  const fromOptions = useMemo(() => {
    if (!toCurrency)
      return [...new Set(currencyExchanges.map((ex) => ex.from))];
    return currencyExchanges
      .filter((ex) => ex.to === toCurrency)
      .map((ex) => ex.from);
  }, [toCurrency, currencyExchanges]);

  // 'to' currency options based on selected 'from'
  const toOptions = useMemo(() => {
    if (!fromCurrency)
      return [...new Set(currencyExchanges.map((ex) => ex.to))];
    return currencyExchanges
      .filter((ex) => ex.from === fromCurrency)
      .map((ex) => ex.to);
  }, [fromCurrency, currencyExchanges]);

  // 2 memos for the exchangeRate and the convertedAmount
  const exchangeRate = useMemo(() => {
    if (!fromCurrency || !toCurrency) return null;
    const exchange = currencyExchanges.find(
      (ex) => ex.from === fromCurrency && ex.to === toCurrency
    );
    return exchange ? exchange.rate : null;
  }, [fromCurrency, toCurrency, currencyExchanges]);

  const convertedAmount = useMemo(() => {
    if (amount === "" || exchangeRate === null) return "";
    return (amount * exchangeRate).toFixed(2);
  }, [amount, exchangeRate]);

  return (
    <Card sx={{ padding: 2, maxWidth: 700, margin: "auto" }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Currency Exchange
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ md: "center" }}
        >
          <Box sx={{ flex: 1, minWidth: 100 }}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value === ""
                    ? ""
                    : Math.max(0, Number(e.target.value))
                )
              }
              fullWidth
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 175 }}>
            <CurrencySelect
              label="From"
              value={fromCurrency}
              onChange={(_event, value) => setFromCurrency(value)}
              options={fromOptions}
            />
          </Box>

          {/* will disappear in smaller screens */}
          {isMdUp && <ArrowRightAltIcon sx={{ color: "gray", fontSize: 28 }} />}

          <Box sx={{ flex: 1, minWidth: 175 }}>
            <CurrencySelect
              label="To"
              value={toCurrency}
              onChange={(_event, value) => setToCurrency(value)}
              options={toOptions}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 100 }}>
            <TextField
              label="Converted"
              value={convertedAmount}
              slotProps={{ input: { readOnly: true } }}
              fullWidth
              sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CurrencyExchangeCard;
