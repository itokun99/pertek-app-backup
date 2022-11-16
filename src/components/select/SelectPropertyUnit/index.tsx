import { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import { SelectOptionType } from '@types';
import { createOptions } from '@utils/helper';
import React, { memo } from 'react';
import SelectOption, { SelectOptionChangeType } from '../SelectOption';
import usePropertyUnit from './hooks';

interface ISelectPropertyUnit {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const SelectPropertyUnit: React.FC<ISelectPropertyUnit> = ({ onChange, value, disabled, error, helperText }) => {
  const { data, loading, keyword, setKeyword, setOpen } = usePropertyUnit();

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
      name='propertyUnit'
      label='Property Unit'
      placeholder='Masukan Nama Property Unit'
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
      error={error}
      helperText={helperText}
    />
  );
};

export default memo(SelectPropertyUnit);
