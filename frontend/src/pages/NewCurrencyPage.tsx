import { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import CurrencySelect from "../components/CurrencySelect";
import { Currency } from "../constants/currencies";
import currencyService from "../services/currencyService";
import Header from "../components/Header";

const NewCurrencyPage: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency | "">("");
  const [toCurrency, setToCurrency] = useState<Currency | "">("");
  const [rate, setRate] = useState<number | "">("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromCurrency || !toCurrency || rate === "" || rate <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }
    try {
      await currencyService.createCurrency({
        from: fromCurrency as Currency,
        to: toCurrency as Currency,
        rate: Number(rate),
      });
      setSuccess(true);
      setFromCurrency("");
      setToCurrency("");
      setRate("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to create currency exchange."
      );
    }
  };

  return (
    <>
      <Header />
      <Card sx={{ padding: 2, maxWidth: 600, margin: "auto", marginTop: 5 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Create New Currency Exchange
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <CurrencySelect
                  label="From Currency"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value as Currency)}
                  options={Object.values(Currency)}
                />
                <CurrencySelect
                  label="To Currency"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value as Currency)}
                  options={Object.values(Currency)}
                />

                <TextField
                  label="Exchange Rate"
                  type="number"
                  value={rate}
                  onChange={(e) =>
                    setRate(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  inputProps={{ step: "0.01", min: "0" }}
                  fullWidth
                />
              </Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create Exchange
              </Button>
            </Stack>
          </form>
        </CardContent>

        <Snackbar
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Currency exchange created successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={4000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
};

export default NewCurrencyPage;
