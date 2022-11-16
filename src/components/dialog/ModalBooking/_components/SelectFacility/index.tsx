// import BaseSelect from "@components/select/SelectOption/BaseSelect";
// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField/TextField";
// import { SelectOptionType } from "@types";
// import { createOptions } from "@utils/helper";
// import { useState } from "react";

// interface IAutoCompleteSelect {
//   label: string;
//   slot: { start: string; end: string }[];
// }
// const SelectFacility: React.FC = () => {
//   const [selected, setSelected] = useState<IAutoCompleteSelect | null>(null);
//   const [singleSelect, setSingleSelect] = useState<null>(null);
//   const handleChange = (_event: any, value: any) => setSelected(value);
//   const handleSelectChange = (_event: any, value: any) => setSingleSelect(value);
//   const options = selected ? selected.slot.map((item) => ({ label: item.start, value: item })) : [];

//   console.info(singleSelect);
//   return (
//     <>
//       <Autocomplete
//         fullWidth
//         disablePortal
//         options={Items}
//         value={selected}
//         onChange={handleChange}
//         isOptionEqualToValue={(options, value) => options.label === value.label}
//         renderInput={(params) => <TextField {...params} label="Facility" fullWidth />}
//       />
//       <Autocomplete
//         value={singleSelect}
//         options={options}
//         onChange={handleSelectChange}
//         disabled={selected === null}
//         isOptionEqualToValue={(options, value) => options.value === value.value}
//         renderInput={(params) => <TextField {...params} label="Facility" fullWidth />}
//       />
//     </>
//   );
// };

// export default SelectFacility;

import Autocomplete, { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField/TextField";
import { IFacility } from "@types";
import useFacilityList from "./hook";

interface ISelectFacility {
  onChange: (event: any, value: any) => void;
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
