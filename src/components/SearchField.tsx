import Search from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const defaultProps = {
  placeholder: 'Search',
  variant: 'outlined',
  fullWidth: true,
};

export type SearchFieldProps = TextFieldProps & typeof defaultProps;

export const SearchField = ({ placeholder, variant }: SearchFieldProps) => (
  <TextField
    fullWidth
    placeholder={placeholder}
    variant={variant}
    InputProps={{
      startAdornment: (
        <InputAdornment position='start'>
          <Search />
        </InputAdornment>
      ),
    }}
  />
);

SearchField.defaultProps = defaultProps;
