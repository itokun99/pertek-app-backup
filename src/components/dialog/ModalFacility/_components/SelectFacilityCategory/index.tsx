import React from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption, { SelectOptionChangeType } from "@components/select/SelectOption";
import useFacilityCategoryList from "./hook";
import { createOptions } from "@utils/helper";

interface ISelectFacilityCategory {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const SelectFacilityCategory: React.FC<ISelectFacilityCategory> = ({
  onChange,
  value,
  disabled,
  error,
  helperText,
}) => {
  const { data, loading, keyword, setKeyword, setOpen } = useFacilityCategoryList();

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
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options: SelectOptionType[] = createOptions(
    data.map((v) => ({
      ...v,
    })),
    "name",
    "id"
  );

  return (
    <SelectOption
      type="auto-complete-select"
      name="category"
      label="Kategori"
      placeholder="Pilih Kategori Fasilitas"
      loading={loading}
      value={value}
      inputValue={keyword}
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

export default SelectFacilityCategory;
