import { Link as RouterLink } from "react-router-dom";
import { ICurrencyExchange } from "../constants/currencies";
import { Box, ListItem, ListItemText, Button, Divider } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

interface CurrencyExchangeListItemProps {
  currencyExchange: ICurrencyExchange;
}

const CurrencyExchangeListItem: React.FC<CurrencyExchangeListItemProps> = ({
  currencyExchange,
}) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <ListItem
        sx={{
          paddingLeft: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <ListItemText
            primary={`${currencyExchange.from} to ${currencyExchange.to}`}
            secondary={`Rate: ${currencyExchange.rate}`}
          />
        </Box>
        <Button
          component={RouterLink}
          to={`/currencies/${currencyExchange._id}`}
          variant="outlined"
          size="small"
          sx={{ textDecoration: "none" }}
          disabled={!isAuthenticated} //disable if isnt authenticated
        >
          EDIT
        </Button>
      </ListItem>
      <Divider />
    </>
  );
};

export default CurrencyExchangeListItem;
