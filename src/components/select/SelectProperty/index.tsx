import React from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption from '../SelectOption';
import usePropertyList from './hook/usePropertyList';
import { createOptions } from '@utils/helper';
import { SelectOptionChangeType } from '../SelectOption';


interface ISelectProperty {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const SelectProperty: React.FC<ISelectProperty> = ({
  onChange,
  value,
  disabled,
  error,
  helperText
}) => {


  const { data, loading, keyword, setOpen, setKeyword } = usePropertyList();


  const handleInputChange = (
    _event: React.SyntheticEvent,
    value: string,
    _reason: AutocompleteInputChangeReason
  ): void => {
    setKeyword(value);
  };

  const handleOpen = () => {
    if (!disabled) {
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const options: SelectOptionType[] = createOptions(data, 'name', 'id')

  return (
    <SelectOption
      name="property"
      label="Properti"
      placeholder="Masukan Nama Properti"
      loading={loading}
      value={value}
      inputValue={keyword}
      type="auto-complete-select"
      onInputChange={handleInputChange}
      onChange={onChange}
      options={options}
      disabled={disabled}
      onOpen={handleOpen}
      onClose={handleClose}
      error={error}
      helperText={helperText}
    />
  );
};

export default SelectProperty;
