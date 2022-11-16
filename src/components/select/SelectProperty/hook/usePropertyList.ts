import { IProperty } from '@general-types';
import useDebounce from '@hooks/useDebounce';
import { getProperty } from '@service/property';
import { useCallback, useEffect, useState } from 'react';

export default function usePropertyList() {
  const [keyword, setKeyword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IProperty[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const search = useDebounce(keyword, 1000);

  const getData = useCallback(() => {
    setError(false);
    setLoading(true);
    getProperty({ search })
      .then((response) => {
        setLoading(false);
        setError(false);
        if (response?.items) {
          setData(response?.items);
        } else {
          setData([]);
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
        setData([]);
      });
  }, [search]);

  useEffect(() => {
    if (open) {
      getData();
    } else {
      setData([]);
      setLoading(false);
      setError(false);
    }
  }, [open, getData]);

  return {
    data,
    error,
    loading,
    keyword,
    setOpen,
    setKeyword,
  };
}
