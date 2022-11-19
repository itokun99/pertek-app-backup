import { useState, useEffect, useCallback } from "react";
import { IFacilityCategory } from "@general-types";
import useDebounce from "@hooks/useDebounce";
import { getFacilityCategory } from "@service/facility-category";

export default function useFacilityCategoryList() {
  const [keyword, setKeyword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IFacilityCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const search = useDebounce(keyword, 1000);

  const getData = useCallback(() => {
    setLoading(true);
    setError(false);
    getFacilityCategory({ search })
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
