import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';

const defaultProps = {
  minWidth: 150,
  label: 'Your Label',
  labelId: 'your-label-id',
  value: 0,
};

export type DropdownSelectProps = SelectProps & typeof defaultProps & { items: [] | null };

export const DropdownSelect = ({ onChange, items, label, labelId, minWidth, value }: DropdownSelectProps) => {
  return (
    <FormControl sx={{ minWidth }}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} labelId={labelId} value={value} onChange={onChange}>
        <MenuItem value={0}>All</MenuItem>
        {items?.map((facility: any) => (
          <MenuItem key={facility.id} value={facility.id}>
            {facility.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

DropdownSelect.defaultProps = defaultProps;
