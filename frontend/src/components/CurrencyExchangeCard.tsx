import { useState, useMemo } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Button,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CurrencySelect from "./CurrencySelect";
import { ICurrencyExchange, Currency } from "../constants/currencies";

interface Props {
  currencyExchanges: ICurrencyExchange[];
}

const CurrencyExchangeCard: React.FC<Props> = ({ currencyExchanges }) => {
  const [amount, setAmount] = useState<number | "">("");
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);

  // 'from' currency options based on selected 'to'
  const fromOptions = useMemo(() => {
    if (!toCurrency) {
      //all froms and tos by default become from options
      return [
        ...new Set([
          ...currencyExchanges.map((ex) => ex.from),
          ...currencyExchanges.map((ex) => ex.to),
        ]),
      ] as Currency[];
    } else {
      //all from options based on the fact that we have a 'to' option (straight exchanges & reverse exchanges)
      const straightExchangePairs = currencyExchanges
        .filter((ex) => ex.to === toCurrency)
        .map((ex) => ex.from);
      const reverseExchangePairs = currencyExchanges
        .filter((ex) => ex.from === toCurrency)
        .map((ex) => ex.to);
      return [
        ...new Set([...straightExchangePairs, ...reverseExchangePairs]),
      ] as Currency[];
    }
  }, [toCurrency, currencyExchanges]);

  // 'to' currency options based on selected 'from'
  const toOptions = useMemo(() => {
    if (!fromCurrency) {
      //all tos and froms by default become to options
      return [
        ...new Set([
          ...currencyExchanges.map((ex) => ex.to),
          ...currencyExchanges.map((ex) => ex.from),
        ]),
      ] as Currency[];
    } else {
      //all to options based on the fact that we have a 'from' option (straight exchanges & reverse exchanges)
      const straightExchangePairs = currencyExchanges
        .filter((ex) => ex.from === fromCurrency)
        .map((ex) => ex.to);
      const reverseExchangePairs = currencyExchanges
        .filter((ex) => ex.to === fromCurrency)
        .map((ex) => ex.from);
      return [
        ...new Set([...straightExchangePairs, ...reverseExchangePairs]),
      ] as Currency[];
    }
  }, [fromCurrency, currencyExchanges]);

  // 2 memos for the exchangeRate and the convertedAmount
  const exchangeRate = useMemo(() => {
    if (!fromCurrency || !toCurrency) return null;
    const straightExchange = currencyExchanges.find(
      (ex) => ex.from === fromCurrency && ex.to === toCurrency
    );
    const reverseExchange = currencyExchanges.find(
      (ex) => ex.from === toCurrency && ex.to === fromCurrency
    );

    if (straightExchange) return straightExchange.rate;
    else if (reverseExchange) return 1 / reverseExchange.rate;
    else return null;
  }, [fromCurrency, toCurrency, currencyExchanges]);

  const convertedAmount = useMemo(() => {
    if (amount === "" || exchangeRate === null) return "";
    return Number((amount * exchangeRate).toFixed(3));
  }, [amount, exchangeRate]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

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

          <Button
            onClick={handleSwap}
            variant="outlined"
            color="primary"
            sx={{ minWidth: "auto", padding: 1 }}
          >
            <SwapHorizIcon />
          </Button>

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
