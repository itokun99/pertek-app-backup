import { memo } from 'react';
import { SelectOptionType } from '@types';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete, { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";


interface IAutoCompleteSelect {
  name?: string;
  value?: SelectOptionType | null;
  options: SelectOptionType[];
  placeholder?: string;
  inputValue?: string;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  onChange: (
    event: React.SyntheticEvent,
    newValue: SelectOptionType | null,
    name: string
  ) => void;
}

function AutoCompleteSelect({
  options,
  value,
  loading,
  inputValue,
  placeholder,
  disabled,
  label,
  onChange,
  onInputChange,
  onOpen,
  onClose
}: IAutoCompleteSelect): JSX.Element {
  return (
    <Autocomplete
      options={options}
      sx={{ width: 300 }}
      onChange={onChange}
      loading={loading}
      style={{ width: "100%" }}
      value={value}
      inputValue={inputValue}
      placeholder={placeholder}
      disabled={disabled}
      onOpen={onOpen}
      onClose={onClose}
      isOptionEqualToValue={(op, val) => op.value === val.value}
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
  )
}

export default memo(AutoCompleteSelect)