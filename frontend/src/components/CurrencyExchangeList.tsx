import { ICurrencyExchange } from "../constants/currencies";
import { Card, CardContent, Typography, List } from "@mui/material";
import CurrencyExchangeListItem from "./CurrencyExchangeListItem";

interface Props {
  currencyExchanges: ICurrencyExchange[];
}

const CurrencyExchangeList: React.FC<Props> = ({ currencyExchanges }) => {
  return (
    <section>
      <Card sx={{ padding: 2, marginBottom: 2, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h5" gutterBottom>
          Available Rates
        </Typography>
        <CardContent>
          <List>
            {currencyExchanges.map((currencyExchange) => (
              <CurrencyExchangeListItem
                key={currencyExchange._id}
                currencyExchange={currencyExchange}
              />
            ))}
          </List>
        </CardContent>
      </Card>
    </section>
  );
};

export default CurrencyExchangeList;
