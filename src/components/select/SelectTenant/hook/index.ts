import { useState, useEffect, useCallback } from "react";
import { ITenant } from "@general-types";
import useDebounce from "@hooks/useDebounce";
import { getTenant } from "@service/tenant";

export default function useTenantList() {
  const [keyword, setKeyword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ITenant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const search = useDebounce(keyword, 1000);

  const getData = useCallback(() => {
    setLoading(true);
    setError(false);
    getTenant({ search })
      .then((res) => {
        setLoading(false);
        setError(false);
        if (res?.items) {
          setData(res.items);
        } else {
          setError(true);
          setData([]);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
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
