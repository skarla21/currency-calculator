import Header from "../components/Header";
import CurrencyExchangeCard from "../components/CurrencyExchangeCard";
import CurrencyExchangeList from "../components/CurrencyExchangeList";
import LoadingOverlay from "../components/LoadingOverlay";
import { useEffect, useState } from "react";
import currencyService from "../services/currencyService";
import { ICurrencyExchange } from "../constants/currencies";
import { Box } from "@mui/material";

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); //data loading state
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
  }, []); //trigger on every mount (coming back to the page)

  if (isLoading) {
    return <LoadingOverlay />;
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
