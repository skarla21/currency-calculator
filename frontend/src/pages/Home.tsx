import Header from "../components/Header";
import CurrencyExchangeCard from "../components/CurrencyExchangeCard";
import CurrencyExchangeList from "../components/CurrencyExchangeList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import currencyService from "../services/currencyService";
import { ICurrencyExchange } from "../constants/currencies";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); //loading state
  const [currencyExchanges, setCurrencyExchanges] = useState<
    ICurrencyExchange[]
  >([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await currencyService.getAllCurrencies();
        setCurrencyExchanges(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load currencies: ", error);
      }
    };
    fetchCurrencies();
  }, [location.key]); //trigger fresh fetch of data on every home navigation

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // subtle overlay for better contrast
        }}
      >
        <Card
          sx={{
            minWidth: 300,
            padding: 4,
            borderRadius: 4,
            backgroundColor: "lightblue",
            boxShadow: 5,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "primary.main", marginBottom: 3 }} />
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              Initial loading may take up to 1 min due to free server instance
              on Render...
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          component="section"
          sx={{ p: 2, marginBottom: 2, width: "100%", maxWidth: "md" }}
        >
          <CurrencyExchangeCard currencyExchanges={currencyExchanges} />
        </Box>

        <Box
          component="section"
          sx={{ p: 2, marginBottom: 2, width: "100%", maxWidth: "md" }}
        >
          <CurrencyExchangeList currencyExchanges={currencyExchanges} />
        </Box>
      </Box>
    </>
  );
};

export default Home;
