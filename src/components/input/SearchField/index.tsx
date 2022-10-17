import { ReactElement, memo } from 'react';


import Box from '@mui/material/Box';
import Search from '@mui/icons-material/Search';
import useTheme from '@mui/material/styles/useTheme';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';


export type SearchFieldProps = TextFieldProps & {
  width?: number;
}



const SearchField = ({ width, placeholder = 'Search', variant = 'outlined', value, onChange }: SearchFieldProps): ReactElement => {
  const theme = useTheme();


  return (
    <Box
      width={width}
      sx={{
        paddingY: theme.spacing(2),
      }}
    >
      <TextField
        fullWidth
        placeholder={placeholder}
        variant={variant}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}

export default memo(SearchField);