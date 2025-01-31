import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Currency, CURRENCY_DISPLAY } from "../constants/currencies";

interface Props {
  label: string;
  value: Currency | "";
  onChange: (event: SelectChangeEvent<Currency>) => void;
  options: Currency[];
}

const CurrencySelect: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: 200 },
          },
        }}
        renderValue={(selected) => selected as Currency}
      >
        {options.map((currency) => (
          <MenuItem key={currency} value={currency}>
            <Typography component="span">
              {CURRENCY_DISPLAY[currency]}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;
