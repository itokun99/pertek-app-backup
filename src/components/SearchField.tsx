import { Search } from '@mui/icons-material';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';

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
