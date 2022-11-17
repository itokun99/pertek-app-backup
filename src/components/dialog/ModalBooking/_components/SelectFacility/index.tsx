import Autocomplete, { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField/TextField";
import { IFacility } from "@types";
import useFacilityList from "./hook";

interface ISelectFacility {
  onChange: (event: any, value: any, name: string) => void;
  value: {
    label: string;
    value: IFacility;
  } | null;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const SelectFacility: React.FC<ISelectFacility> = ({
  value,
  onChange,
  error,
  disabled,
  helperText,
}) => {
  const { data, setOpen, setKeyword, loading } = useFacilityList();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (
    _event: React.SyntheticEvent,
    value: string,
    _reason: AutocompleteInputChangeReason
  ): void => {
    setKeyword(value);
  };

  const options = data.map((dt) => ({ label: dt.name, value: dt }));

  return (
    <>
      <Autocomplete
        fullWidth
        disablePortal
        options={options}
        value={value}
        onInputChange={handleInputChange}
        onChange={onChange}
        onOpen={handleOpen}
        onClose={handleClose}
        isOptionEqualToValue={(options, value) => options.label === value.label}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Facility"
            placeholder="Masukan Nama Fasilitas"
            name="facility"
            fullWidth
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default SelectFacility;
