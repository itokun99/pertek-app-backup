import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { SelectOptionType } from '@types';
import { createOptions } from '@utils/helper';
import React, { memo } from 'react';
import SelectOption, { SelectOptionChangeType } from '../SelectOption';
import useRoleGroupList from './hook/useRoleGroupList';

interface ISelectRoleGroup {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
}

const SelectRoleGroup: React.FC<ISelectRoleGroup> = ({ onChange, value, disabled }) => {
  const { data, loading, keyword, setKeyword, setOpen } = useRoleGroupList();

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

  const options: SelectOptionType[] = createOptions(data, 'name', 'id');

  return (
    <SelectOption
      name='roleGroup'
      label='Role Group'
      placeholder='Masukan Nama Role Group'
      loading={loading}
      value={value}
      inputValue={keyword}
      onInputChange={handleInputChange}
      onChange={onChange}
      options={options}
      disabled={disabled}
      onOpen={handleOpen}
      onClose={handleClose}
      type='auto-complete-select'
    />
  );
};

export default memo(SelectRoleGroup);
