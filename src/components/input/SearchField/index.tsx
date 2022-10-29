/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, memo, useState, useCallback, ChangeEvent, useEffect, useRef } from 'react';
import { ParsedUrlQueryInput } from 'node:querystring';

import Box from '@mui/material/Box';
import Search from '@mui/icons-material/Search';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import useDebounce from '../../../hooks/useDebounce';
import { useTheme } from '@mui/material';

export type SearchFieldProps = Omit<TextFieldProps, 'onChange'> & {
  width?: number;
};

const SearchField = ({ width, placeholder = 'Search', variant = 'outlined' }: SearchFieldProps): ReactElement => {
  const router = useRouter();
  const { query } = router;
  const initialRender = useRef<boolean>(false);

  const theme = useTheme();

  const [searchKeyword, setSearchKeyword] = useState(query.search || '');

  const searchDebounce = useDebounce(searchKeyword, 1000);

  const clearEmptyObject = (object: { [x: string]: string | string[] | undefined }) => {
    const cleanedObject: { [x: string]: string | string[] | undefined } = {};
    Object.keys(object).forEach((key: string) => {
      if (object[key] === null || object[key] === undefined || object[key] === '[]') {
        return;
      }
      cleanedObject[key] = object[key];
    });
    return cleanedObject;
  };

  const search = useCallback(
    (params: Record<string, string>) => {
      const queryParameter = clearEmptyObject({
        ...query,
        ...params,
      }) as ParsedUrlQueryInput;

      router.push({
        query: queryParameter,
      });
    },
    [searchDebounce]
  );

  useEffect(() => {
    if (initialRender.current) {
      query.page = '1';
      search({
        search: searchDebounce,
      } as Record<string, string>);
    }
    initialRender.current = true;
  }, [searchDebounce]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchKeyword(value);
  };

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
        value={searchKeyword}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default memo(SearchField);
