import { Autocomplete, TextField } from "@mui/material";
import { Currency, CURRENCY_DISPLAY } from "../constants/currencies";

interface Props {
  label: string;
  value: Currency | null;
  onChange: (event: React.SyntheticEvent, value: Currency | null) => void;
  options: Currency[];
}

const CurrencySelect: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(currency) => CURRENCY_DISPLAY[currency]}
      value={value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={label} />}
      fullWidth
    />
  );
};

export default CurrencySelect;
