import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ApiResponseType, SelectOptionType } from "../../types";

interface ISelectProperty {
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: SelectOptionType | null
  ) => void;
  value?: SelectOptionType | null;
}

const SelectProperty: React.FC<ISelectProperty> = ({ onChange, value }) => {
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
      renderInput={(params) => <TextField {...params} label="Pilih Properti" fullWidth />}
      fullWidth
    />
  );
};

export default SelectProperty;
