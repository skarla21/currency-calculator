import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { ICurrencyExchange } from "../constants/currencies";
import currencyService from "../services/currencyService";
import Header from "../components/Header";
import LoadingOverlay from "../components/LoadingOverlay";

const CurrencyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [currencyExchange, setCurrencyExchange] =
    useState<ICurrencyExchange | null>(null);
  const [rate, setRate] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); //data loading state

  const navigate = useNavigate();

  //handle update
  const handleUpdate = async () => {
    if (rate === "") {
      setError("Rate cannot be empty.");
      return;
    }
    if (rate === currencyExchange!.rate) {
      setError("Update only if value is changed.");
      return;
    }
    try {
      await currencyService.updateCurrency({
        _id: currencyExchange!._id,
        from: currencyExchange!.from,
        to: currencyExchange!.to,
        rate: Number(rate),
      });
      setSuccess(true);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to update currency exchange."
      );
    }
  };

  //handle delete
  const handleDelete = async () => {
    try {
      await currencyService.deleteCurrency({
        _id: currencyExchange!._id,
        from: currencyExchange!.from,
        to: currencyExchange!.to,
      });
      navigate("/"); //redirect back to home
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to delete currency exchange."
      );
    }
  };

  //fetch the currency exchange based on the id
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const data = await currencyService.getCurrencyById(id!);
        setCurrencyExchange(data);
        setRate(data.rate);
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch currency exchange."
        );
      }
    };
    fetchCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Header />
      <Card sx={{ padding: 2, maxWidth: 600, margin: "auto", marginTop: 5 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Exchange Rate Details
          </Typography>

          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ md: "center" }}
            >
              <TextField
                label="From Currency"
                value={currencyExchange!.from}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="To Currency"
                value={currencyExchange!.to}
                disabled
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Exchange Rate"
                type="number"
                value={rate}
                onChange={(e) =>
                  setRate(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, Number(e.target.value))
                  )
                }
                inputProps={{ step: "0.01", min: "0" }}
                fullWidth
              />
            </Stack>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ md: "center" }}
              sx={{ marginTop: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                fullWidth
              >
                Update Rate
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                endIcon={<DeleteIcon />}
                fullWidth
              >
                Delete Rate
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                fullWidth
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Currency exchange updated successfully!
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
    </>
  );
};

export default CurrencyDetailPage;
