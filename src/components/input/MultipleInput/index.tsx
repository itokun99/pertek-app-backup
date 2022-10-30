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
import CircularProgress from '@mui/material/CircularProgress';


export type MultipleInputChangeType = (name: string, value: IMultipleInputItem[]) => void;

export interface IMultipleInputItem {
  id?: number;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  loading?: boolean;
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
  onDelete: (name: string, data: IMultipleInputItem) => Promise<void>;
  onSave: (name: string, data: IMultipleInputItem) => Promise<void>;
}



function MultipleInput({
  name,
  label,
  type,
  values = [],
  onChange,
  maxField,
  onSave,
  onDelete,
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


  const handleClickAdd = () => {
    const currentVal = [...values]

    currentVal.push({
      value: "",
      checked: false
    })
    onChange(name, currentVal);
  }

  const handleClickDelete = (index: number, data: IMultipleInputItem) => {
    const currentVal = [...values];


    if (activeEdit !== -1 && tempValue.length > 0) {
      currentVal[index] = {
        ...currentVal[index],
        loading: true
      }
      onChange(name, currentVal);
      onDelete(name, data).then(() => {
        const newVals = currentVal.filter(val => val.id !== data.id);
        onChange(name, newVals);
        setActiveEdit(-1);
        setTempValue([]);
      }).catch(() => {
        currentVal[index] = {
          ...currentVal[index],
          loading: false
        }
        onChange(name, currentVal);
      });
    } else if (Boolean(data.id)) {
      onDelete(name, data).then(() => {
        const newVals = currentVal.filter(val => val.id !== data.id);
        onChange(name, newVals);
        setActiveEdit(-1);
        setTempValue([]);
      }).catch(() => {
        currentVal[index] = {
          ...currentVal[index],
          loading: false
        }
        onChange(name, currentVal);
      });
    } else {

      currentVal.splice(index, 1);
      onChange(name, currentVal);
    }
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


  const handleClickSave = (index: number, data: IMultipleInputItem) => {
    if (activeEdit !== -1) {
      const currentVal = [...values];
      const currentValItem = currentVal[index];
      const newItem = {
        ...currentValItem,
        loading: true,
      }
      currentVal[index] = newItem;
      onChange(name, currentVal);
      onSave(name, data).then(() => {
        currentVal[index] = {
          ...currentVal[index],
          loading: false,
          disabled: true
        }
        onChange(name, currentVal);
        setActiveEdit(-1);
        setTempValue([]);
      }).catch(() => {
        currentVal[index] = {
          ...currentVal[index],
          loading: false
        }
        onChange(name, currentVal);
      });
    }
  }


  return (
    <Stack direction="column" sx={{ width: '100%' }} spacing={2}>
      {values.length > 0 ? (
        <>
          {values.map((val, index) => {

            const hasId = Boolean(val.id);
            const isEditable = hasId && !val.disabled;
            const isLoading = Boolean(val.loading);
            const inputDisabled = (index !== activeEdit && tempValue.length > 0) || isLoading || false;

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
                          {isLoading && (
                            <CircularProgress color="inherit" size={20} />
                          )}
                          {withCheckbox && (
                            <Tooltip title="Verified">
                              <Checkbox disabled={val.disabled || inputDisabled} checked={val.checked} onChange={handleInputChange} name={getName(name, index, 'checkbox')} />
                            </Tooltip>
                          )}
                          {hasId && (
                            <Stack spacing={2} direction="row">
                              {isEditable ? (
                                <>
                                  <IconButton onClick={() => handleDiscard(index)} edge="end">
                                    <CancelIcon />
                                  </IconButton>
                                  <Box />
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

                    {hasId && isEditable ? (
                      <Tooltip title="Simpan">
                        <IconButton
                          // name={getName(name, index, 'add-button')}
                          onClick={() => handleClickSave(index, val)}
                        // disabled={getDisableAddButton(index, values.length) || inputDisabled}
                        >
                          <SaveIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Tambah">
                        <IconButton
                          name={getName(name, index, 'add-button')}
                          onClick={handleClickAdd}
                          disabled={getDisableAddButton(index, values.length) || inputDisabled}
                        >
                          <AddIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Hapus">
                      <IconButton
                        name={getName(name, index, 'delete-button')}
                        onClick={() => handleClickDelete(index, val)}
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