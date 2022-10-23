import React, { memo } from "react";
import { SelectChangeEvent } from '@mui/material/Select';
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import AutoCompleteSelect from "./AutoCompleteSelect";
import BaseSelect from "./BaseSelect";

export type SelectOptionChangeType<T = any> = (name: string, value: T) => void;
interface ISelectOptionProps {
  id?: string;
  name: string;
  onChange: SelectOptionChangeType;
  value?: SelectOptionType | null | string;
  placeholder?: string;
  inputValue?: string;
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onOpen?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  options: SelectOptionType[],
  type?: 'base-select' | 'auto-complete-select';
}

const SelectOption = ({
  id,
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
  type = 'base-select'
}: ISelectOptionProps) => {

  const handleAutoCompleteSelectChange = (_event: React.SyntheticEvent, newValue: SelectOptionType | null) => {
    onChange(name, newValue)
  }

  const handleBaseSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    onChange(name, value);
  };


  switch (type) {
    case 'auto-complete-select':
      return (
        <AutoCompleteSelect
          name={name}
          label={label}
          options={options}
          onChange={handleAutoCompleteSelectChange}
          loading={loading}
          value={value as SelectOptionType | null}
          inputValue={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          onOpen={onOpen}
          onClose={onClose}
          onInputChange={onInputChange}
        />
      );

    default:
      return (
        <BaseSelect
          options={options}
          label={label}
          onChange={handleBaseSelectChange}
          value={String(value)}
          disabled={disabled}
          id={id}
          name={name}
          placeholder={placeholder}
        />
      )
  }
};

export default memo(SelectOption);
