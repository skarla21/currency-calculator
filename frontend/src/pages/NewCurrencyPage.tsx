import { useState } from "react";
import {
  Box,
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
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
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
      setFromCurrency(null);
      setToCurrency(null);
      setRate("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.message || "Failed to create currency exchange.");
    }
  };

  return (
    <>
      <Header />
      <Card sx={{ padding: 2, maxWidth: 600, margin: "auto", marginTop: 5 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Create New Exchange Rate
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Box sx={{ flex: 1, minWidth: 180 }}>
                  <CurrencySelect
                    label="From"
                    value={fromCurrency}
                    onChange={(_event, value) => setFromCurrency(value)}
                    options={Object.values(Currency)}
                  />
                </Box>

                <Box sx={{ flex: 1, minWidth: 180 }}>
                  <CurrencySelect
                    label="To"
                    value={toCurrency}
                    onChange={(_event, value) => setToCurrency(value)}
                    options={Object.values(Currency)}
                  />
                </Box>

                <Box sx={{ flex: 1, minWidth: 120 }}>
                  <TextField
                    label="Exchange Rate"
                    type="number"
                    value={rate}
                    onChange={(e) =>
                      setRate(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    inputProps={{ step: "0.01", min: "0" }}
                    fullWidth
                  />
                </Box>
              </Stack>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create Rate
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
            Exchange Rate created successfully!
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
