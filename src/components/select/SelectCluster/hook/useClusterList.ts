import { useState, useEffect, useCallback } from 'react';
import { ICluster } from '../../../../types';
import useDebounce from '../../../../hooks/useDebounce';
import { getCluster } from '../../../../service/cluster';

export default function useClusterList() {

  const [keyword, setKeyword] = useState<string>('');
  const [propertyId, setPropertyId] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ICluster[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const search = useDebounce(keyword, 1000);

  const getData = useCallback(() => {
    setLoading(true);
    setError(false);
    if(Boolean(propertyId)) {
      getCluster({ search, property_id: propertyId })
        .then(res => {
          setLoading(false);
          setError(false);
          if(res?.items) {
            setData(res.items);
          } else {
            setError(true);
            setData([]);
          }
        }).catch(() => {
          setError(true);
          setLoading(false);
        })
    }
  }, [propertyId, search]);


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
    setKeyword,
    setPropertyId
  }
}