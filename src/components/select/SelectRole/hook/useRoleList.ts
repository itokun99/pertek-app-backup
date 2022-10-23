import { useState, useEffect, useCallback } from 'react';
import { IRole } from '@types';
import useDebounce from '@hooks/useDebounce';
import { getRole } from '@service/role';

export default function useRoleList() {

  const [keyword, setKeyword] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const search = useDebounce(keyword, 1000);

  const getData = useCallback(() => {
    setLoading(true);
    setError(false);
      getRole({ search })
        .then(res => {
          setLoading(false);
          setError(false);
          if(res) {
            setData(res);
          } else {
            setError(true);
            setData([]);
          }
        }).catch(() => {
          setError(true);
          setLoading(false);
        })
  }, [ search]);


  useEffect(() => {
    if(open) {
      getData();
    } else {
      setData([]);
      setLoading(false);
      setError(false);
    }
  }, [open, getData])

  

  return {
    data,
    error,
    loading,
    keyword,
    setOpen,
    setKeyword
  }
}