import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField/TextField";
import { IFacilityBookingSlot } from "@types";

interface ISelectBookingSlot {
  data: IFacilityBookingSlot[];
  onChange: (event: any, value: any, name: string) => void;
  value: {
    label: string;
    value: IFacilityBookingSlot;
  } | null;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}
const SelectBookingSlot: React.FC<ISelectBookingSlot> = ({
  data = [],
  value = null,
  onChange,
  disabled,
  error,
  helperText,
}) => {
  const options = data
    ? data.map((item) => ({ label: `${item.start} - ${item.end}`, value: item }))
    : [];

  return (
    <>
      <Autocomplete
        value={value}
        options={options}
        disablePortal
        onChange={onChange}
        disabled={disabled}
        isOptionEqualToValue={(options, value) => options.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Booking Slot"
            name="bookingSlot"
            placeholder="Select Booking Slot"
            disabled={disabled}
            fullWidth
            error={error}
            helperText={helperText}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              ...params.InputProps,
              endAdornment: <>{params.InputProps.endAdornment}</>,
            }}
          />
        )}
      />
    </>
  );
};

export default SelectBookingSlot;
