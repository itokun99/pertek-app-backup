import React, { useEffect } from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption from '../SelectOption';
import useClusterList from './hook/useClusterList';
import { createOptions } from '@utils/helper';
import { SelectOptionChangeType } from '../SelectOption';


interface ISelectCluster {
  onChange: SelectOptionChangeType<SelectOptionType>;
  value?: SelectOptionType | null;
  disabled?: boolean;
  propertyId?: number;
}

const SelectCluster: React.FC<ISelectCluster> = ({
  onChange,
  value,
  disabled,
  propertyId
}) => {


  const { data, loading, keyword, setKeyword, setOpen, setPropertyId } = useClusterList();



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

  useEffect(() => {
    if (propertyId) {
      setPropertyId(propertyId);
    }
  }, [propertyId, setPropertyId])

  const options: SelectOptionType[] = createOptions(data, 'name', 'id')

  return (
    <SelectOption
      name="cluster"
      label="Pilih Klaster"
      placeholder="Masukan Nama Klaster"
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

export default SelectCluster;