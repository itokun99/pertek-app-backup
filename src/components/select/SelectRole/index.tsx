import React, { useEffect, memo } from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption from '../SelectOption';
import useRoleList from './hook/useRoleList';
import { createOptions } from '@utils/helper';
import { SelectOptionChangeType } from '../SelectOption';


interface ISelectRole {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
}

const SelectRole: React.FC<ISelectRole> = ({
  onChange,
  value,
  disabled
}) => {


  const { data, loading, keyword, setKeyword, setOpen } = useRoleList();



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
      name="role"
      label="Role"
      placeholder="Masukan Nama Role"
      loading={loading}
      value={value}
      inputValue={keyword}
      onInputChange={handleInputChange}
      onChange={onChange}
      options={options}
      disabled={disabled}
      onOpen={handleOpen}
      onClose={handleClose}
      type="auto-complete-select"
    />
  );
};

export default memo(SelectRole);