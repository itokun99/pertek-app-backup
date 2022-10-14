import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { ApiResponseType, SelectOptionType } from "../../types";

interface ISelectProperty {
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: SelectOptionType | null
  ) => void;
  value?: SelectOptionType | null;
  placeholder?: string;
  inputValue?: string;
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
}

const SelectProperty: React.FC<ISelectProperty> = ({ onChange, value, placeholder, inputValue, onInputChange }) => {
  const [listProperty, setListProperty] = React.useState<SelectOptionType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/properti");
      if (response.ok) {
        const data: ApiResponseType<{ name: string; id: string }[]> = await response.json();
        const dataOptions: SelectOptionType[] = [];
        data.items.forEach(({ name, id }) => dataOptions.push({ label: name, value: id }));
        setListProperty(dataOptions);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <Autocomplete
      options={listProperty}
      sx={{ width: 300 }}
      onChange={onChange}
      loading={loading}
      style={{ width: "100%" }}
      value={value}
      inputValue={inputValue}
      placeholder={placeholder}
      onInputChange={onInputChange}
      renderInput={(params) => <TextField {...params} label="Pilih Properti" fullWidth />}
      fullWidth
    />
  );
};

export default SelectProperty;
