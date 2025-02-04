import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import {
  Currency,
  CURRENCY_COUNTRY_DISPLAY,
  CURRENCY_FLAG_CODE,
} from "../constants/currencies";

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
  const [inputValue, setInputValue] = useState<string>(value || ""); //display the simplified Currency version as string

  useEffect(() => {
    if (value) {
      setInputValue(value);
    } else {
      setInputValue(""); //if its null
    }
  }, [value]);

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(currency) => CURRENCY_COUNTRY_DISPLAY[currency]}
      value={value}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue, reason) => {
        if (reason === "input") {
          setInputValue(newInputValue); //only update inputValue when the user types, in case of typed input
        }
      }}
      onChange={(event, newValue) => {
        onChange(event, newValue); //call the outside onChange
        setInputValue(newValue ? newValue : ""); //when an option is selected update inputValue to just the currency code
      }}
      renderOption={(props, option) => {
        //renderOption flag + country
        const { key, ...otherProps } = props;
        return (
          <li key={key} {...otherProps}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${CURRENCY_FLAG_CODE[
                option
              ].toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${CURRENCY_FLAG_CODE[
                option
              ].toLowerCase()}.png 2x`}
              alt=""
              style={{ marginRight: 8 }}
            />
            {CURRENCY_COUNTRY_DISPLAY[option]}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      fullWidth
      blurOnSelect
    />
  );
};

export default CurrencySelect;
