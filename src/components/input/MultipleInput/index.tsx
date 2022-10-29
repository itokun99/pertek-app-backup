import React, { memo, SyntheticEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';

export type MultipleInputChangeType = (name: string, value: IMultipleInputItem[]) => void;

export interface IMultipleInputItem {
  id?: number;
  value: string;
  checked?: boolean;
  disabled?: boolean;
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

  const [tempValue, setTempValue] = useState<IMultipleInputItem[]>([]);
  const [activeEdit, setActiveEdit] = useState<number>(-1);


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
    const currentVal = [...values]

    currentVal.push({
      value: "",
      checked: false
    })
    onChange(name, currentVal);
  }

  const handleClickDelete: React.MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    const { name: inputName } = e.currentTarget;
    const currentIndex = parseInt(inputName.split('-')[1]);
    const currentVal = [...values];

    currentVal.splice(currentIndex, 1);
    onChange(name, currentVal);
  }

  const handleClickEditInput = (index: number) => {
    const currentVal = [...values];
    const currentValItem = currentVal[index];

    const newItem = {
      ...currentValItem,
      disabled: !currentValItem.disabled
    }

    currentVal[index] = newItem;
    onChange(name, currentVal);
    setTempValue(currentVal);
    setActiveEdit(index);
  }

  const handleDiscard = (index: number) => {
    const currentVal = [...tempValue];
    const currentValItem = currentVal[index];

    const newItem = {
      ...currentValItem,
      disabled: true
    }

    currentVal[index] = newItem;

    setActiveEdit(-1);
    setTempValue([]);
    onChange(name, currentVal);
  }


  return (
    <Stack direction="column" sx={{ width: '100%' }} spacing={2}>
      {values.length > 0 ? (
        <>
          {values.map((val, index) => {

            const hasId = Boolean(val.id);
            const isEditable = hasId && !val.disabled;
            const inputDisabled = (hasId && val.disabled && index !== activeEdit && tempValue.length > 0) || false;

            return (
              <Box key={`multiple-input-key-${index}`} sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    type={type}
                    onChange={handleInputChange}
                    name={getName(name, index)}
                    value={val.value}
                    fullWidth
                    disabled={val.disabled || inputDisabled}
                    label={getLabel(label, index, values.length)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {withCheckbox && (
                            <Tooltip title="Verified">
                              <Checkbox disabled={val.disabled} checked={val.checked} onChange={handleInputChange} name={getName(name, index, 'checkbox')} />
                            </Tooltip>
                          )}
                          {hasId && (
                            <Stack spacing={2} direction="row">
                              {isEditable ? (
                                <>
                                  <IconButton onClick={() => handleClickEditInput(index)} edge="end">
                                    <SaveIcon />
                                  </IconButton>
                                  <IconButton onClick={() => handleDiscard(index)} edge="end">
                                    <CancelIcon />
                                  </IconButton>
                                </>
                              ) : (
                                <>
                                  <IconButton disabled={inputDisabled} onClick={() => handleClickEditInput(index)} edge="end">
                                    <EditIcon />
                                  </IconButton>
                                  <Box />
                                </>
                              )}
                            </Stack>
                          )}
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2 }}>
                  <Stack direction="row" spacing={1}>

                    <Tooltip title="Tambah">
                      <IconButton
                        name={getName(name, index, 'add-button')}
                        onClick={handleClickAdd}
                        disabled={getDisableAddButton(index, values.length) || inputDisabled}
                      >
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hapus">
                      <IconButton
                        name={getName(name, index, 'delete-button')}
                        onClick={handleClickDelete}
                        disabled={getDisableDeleteButton(index, values.length) || inputDisabled}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Box>
            )
          })}
        </>
      ) : (
        <Box>
          <Button onClick={handleClickAdd} startIcon={<AddIcon />} color="primary" variant="contained">Tambah {label}</Button>
        </Box>
      )}

    </Stack>
  )
}

export default memo(MultipleInput);