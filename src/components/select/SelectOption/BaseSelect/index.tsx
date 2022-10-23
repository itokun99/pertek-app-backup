import React, { memo, useId } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { SelectOptionType } from '@types';

interface IBaseSelectProps {
  id?: string;
  label: string | React.ReactNode | React.ReactElement | JSX.Element | null;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
  options: SelectOptionType[];
  onChange: (event: SelectChangeEvent) => void
}

function BaseSelect({
  id,
  name,
  label,
  disabled,
  onChange,
  value,
  options,
  error,
  helperText,
  placeholder
}: IBaseSelectProps): JSX.Element {
  const labelId = useId();
  const selectId = useId();

  return (
    <FormControl fullWidth disabled={disabled} error={error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        name={name}
        labelId={labelId}
        id={id || selectId}
        value={value}
        label={label}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      >
        {options.map(option => (
          <MenuItem key={`select-${id}-menu-item-${option.value}`} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}

export default memo(BaseSelect)