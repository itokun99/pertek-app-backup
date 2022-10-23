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
  disabled?: boolean;
}

const SelectProperty: React.FC<ISelectProperty> = ({
  onChange,
  value,
  disabled
}) => {


  const { data, error, loading, keyword, setOpen, setKeyword } = usePropertyList();


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
      label="Pilih Properti"
      placeholder="Masukan Nama Properti"
      loading={loading}
      value={value}
      inputValue={keyword}
      onInputChange={handleInputChange}
      onChange={onChange}
      options={options}
      disabled={disabled}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
};

export default SelectProperty;
