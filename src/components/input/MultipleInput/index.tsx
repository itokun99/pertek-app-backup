import React, { memo, SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export type MultipleInputChangeType = (name: string, value: IMultipleInputItem[]) => void;

export interface IMultipleInputItem {
  value: string;
  checked?: boolean;
}

export function validateMultipleInput(datas: IMultipleInputItem[]): IMultipleInputItem[] {
  const currentData = [...datas];

  if (currentData.length === 0) {
    return [];
  }

  const result = currentData.filter(data => data.value.trim() !== "");

  if (result.length === 0) {
    return [];
  }

  return result;
}

// export function createMultipleInputValues<T>(data: T[], checkedKey: string, valueKey: string): IMultipleInputItem[] {
//   return data.map(v => ({
//     value: v[valueKey as keyof typeof data],
//     checked: v[checkedKey as keyof typeof data]
//   }))
// }

interface IMultipleInputProps {
  label: string;
  name: string;
  type?: string;
  maxField?: number;
  onChange: MultipleInputChangeType;
  values: IMultipleInputItem[];
  withCheckbox?: boolean;
}



function MultipleInput({
  name,
  label,
  type,
  values = [],
  onChange,
  maxField,
  withCheckbox
}: IMultipleInputProps) {


  const getLabel = (label: string, index: number, valuesLength: number) => {
    if (valuesLength > 1) {
      return `${label} ${index + 1}`;
    }

    return label;
  }

  const getName = (name: string, index: number, prefix?: string) => {
    if (prefix) {
      return `${name}-${index}-${prefix}`;
    }
    return `${name}-${index}`;
  }

  const getDisableAddButton = (index: number, valuesLength: number) => {
    if ((maxField && (index + 1) >= maxField) || ((index + 1) !== valuesLength)) {
      return true;
    }

    return false;
  }

  const getDisableDeleteButton = (index: number, valuesLength: number) => {
    if (valuesLength === 1 && index === 0) {
      return true;
    }

    return false;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name: inputName, checked } = e.currentTarget;
    const currentIndex = parseInt(inputName.split('-')[1]);
    const isCheckbox = inputName.includes('checkbox');

    console.log("inputName", inputName, value, currentIndex);

    if (typeof currentIndex !== 'undefined' && currentIndex !== null && typeof currentIndex === 'number') {
      const currentVal = [...values];
      const currentValItem = currentVal[currentIndex];
      const newValItem = isCheckbox ? {
        ...currentValItem,
        checked
      } : {
        ...currentValItem,
        value
      }

      currentVal[currentIndex] = newValItem;
      const newVal = [...currentVal];
      console.log("newVal", newVal);

      onChange(name, newVal);
    }
  }


  const handleClickAdd: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    const { name: inputName } = e.currentTarget;
    const currentIndex = parseInt(inputName.split('-')[1]);
    const currentVal = [...values]

    currentVal.push({
      value: "",
      checked: false
    })

    console.log("name", inputName, currentIndex, currentVal);
    onChange(name, currentVal);
  }

  const handleClickDelete: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    const { name: inputName } = e.currentTarget;
    const currentIndex = parseInt(inputName.split('-')[1]);
    const currentVal = [...values];

    currentVal.splice(currentIndex, 1);


    console.log("name", inputName, currentIndex, currentVal);
    onChange(name, currentVal);
  }

  return (
    <Stack direction="column" sx={{ width: '100%' }} spacing={2}>
      {values.map((val, index) => {
        return (
          <Box key={`multiple-input-key-${index}`} sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <TextField type={type} onChange={handleInputChange} name={getName(name, index)} value={val.value} fullWidth label={getLabel(label, index, values.length)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2 }}>
              <Stack direction="row" spacing={1}>
                {withCheckbox && (
                  <Tooltip title="Verified">
                    <Checkbox checked={val.checked} onChange={handleInputChange} name={getName(name, index, 'checkbox')} />
                  </Tooltip>
                )}
                <Tooltip title="Tambah">
                  <IconButton
                    name={getName(name, index, 'add-button')}
                    onClick={handleClickAdd}
                    disabled={getDisableAddButton(index, values.length)}
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Hapus">
                  <IconButton
                    name={getName(name, index, 'delete-button')}
                    onClick={handleClickDelete}
                    disabled={getDisableDeleteButton(index, values.length)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Box>
        )
      })}
    </Stack>
  )
}

export default memo(MultipleInput);