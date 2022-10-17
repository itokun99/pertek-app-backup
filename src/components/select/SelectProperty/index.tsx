import React, { useEffect } from "react";
import useSWR from 'swr';
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { ApiResponseType, IProperty, SelectOptionType } from "../../../types";
import SelectOption from '../SelectOption';
import usePropertyList from './hook/usePropertyList';
import { createOptions } from '../../../utils/helper';


interface ISelectProperty {
  onChange: (
    event: React.SyntheticEvent,
    newValue: SelectOptionType | null,
    name: string
  ) => void;
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
