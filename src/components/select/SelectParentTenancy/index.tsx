import React, { useEffect } from "react";
import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import { SelectOptionType } from "@types";
import SelectOption from '../SelectOption';
import useParentTenancyList from './hook/useParentTenancyList';
import { createOptions } from '@utils/helper';
import { SelectOptionChangeType } from '../SelectOption';


interface ISelectParentTenancy {
  onChange: SelectOptionChangeType<string>;
  value?: string;
  unitId?: number;
  error?: boolean;
  helperText?: string;
}

const SelectParentTenancy: React.FC<ISelectParentTenancy> = ({
  onChange,
  value,
  unitId,
  error,
  helperText
}) => {

  const disabled = !unitId;


  const { data, loading, setUnitId } = useParentTenancyList();

  useEffect(() => {
    if (unitId) {
      setUnitId(unitId);
    }
  }, [unitId, setUnitId])

  const options: SelectOptionType[] = createOptions(data.map(v => ({
    ...v,
    fullName: `${v.first_name} ${v.last_name}`
  })), 'fullName', 'id')

  return (
    <SelectOption
      type="base-select"
      name="parentTenancy"
      label="Parent Tenancy"
      placeholder="Pilih Parent Tenancy"
      loading={loading}
      value={value}
      onChange={onChange}
      options={options}
      disabled={disabled}
      error={error}
      helperText={helperText}
    />
  );
};

export default React.memo(SelectParentTenancy);