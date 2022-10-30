import React from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption from '../SelectOption';
import useContactList from './hook/useContactList';
import { createOptions } from '@utils/helper';
import { SelectOptionChangeType } from '../SelectOption';


interface ISelectContact {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const SelectContact: React.FC<ISelectContact> = ({
  onChange,
  value,
  disabled,
  error,
  helperText
}) => {


  const { data, loading, keyword, setKeyword, setOpen } = useContactList();



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

  const options: SelectOptionType[] = createOptions(data.map(v => ({
    ...v,
    fullName: `${v.first_name} ${v.last_name}`
  })), 'fullName', 'id');

  return (
    <SelectOption
      type="auto-complete-select"
      name="contact"
      label="Kontak"
      placeholder="Masukan Nama Kontak"
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

export default SelectContact;