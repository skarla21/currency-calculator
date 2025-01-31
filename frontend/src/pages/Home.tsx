import Header from "../components/Header";
import CurrencyExchangeCard from "../components/CurrencyExchangeCard";
import CurrencyExchangeList from "../components/CurrencyExchangeList";
import { useEffect, useState } from "react";
import currencyService from "../services/currencyService";
import { ICurrencyExchange } from "../constants/currencies";
import { Box, CircularProgress, Typography } from "@mui/material";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); //loading state
  const [currencyExchanges, setCurrencyExchanges] = useState<
    ICurrencyExchange[]
  >([]);

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
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", //loader takes up the full screen height
          textAlign: "center",
        }}
      >
        <CircularProgress sx={{ marginBottom: 2 }} />
        <Typography variant="h6">
          Initial Loading may take up to 1 min due to free server instance on
          Render...
        </Typography>
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
