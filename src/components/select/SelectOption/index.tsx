import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { FetcherResponseError } from '../../../lib/dataFetcher';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete, { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { ApiResponseType, SelectOptionType } from "../../../types";
import { getUnit } from '../../../service/unit';

interface ISelectOption {
  name: string;
  onChange: (
    event: React.SyntheticEvent,
    newValue: SelectOptionType | null,
    name: string
  ) => void;
  value?: SelectOptionType | null;
  placeholder?: string;
  inputValue?: string;
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  label: string;
  loading: boolean;
  disabled?: boolean;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  options: SelectOptionType[]
}

const SelectOption: React.FC<ISelectOption> = ({
  name,
  onChange,
  value,
  placeholder,
  inputValue,
  onInputChange,
  label,
  options,
  loading,
  disabled,
  onOpen,
  onClose,
}) => {

  const handleChange: (
    e: React.SyntheticEvent,
    newValue: SelectOptionType | null
  ) => void = (e, newValue) => {
    onChange(e, newValue, name)
  }


  return (
    <Autocomplete
      options={options}
      sx={{ width: 300 }}
      onChange={handleChange}
      loading={loading}
      style={{ width: "100%" }}
      value={value}
      inputValue={inputValue}
      placeholder={placeholder}
      disabled={disabled}
      onOpen={onOpen}
      onClose={onClose}
      isOptionEqualToValue={(options, value) => options.value === value.value}
      onInputChange={onInputChange}
      renderInput={(params) => <TextField {...params}
        label={label}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />}
      fullWidth
    />
  );
};

export default SelectOption;
