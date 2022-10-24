import { useState, useEffect, useCallback } from "react";
import { IRoleGroup } from "@general-types";
import useDebounce from "@hooks/useDebounce";
import { getRoleGroup } from "@service/role-group";

export default function useRoleGroupList() {
  const [keyword, setKeyword] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IRoleGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const search = useDebounce(keyword, 1000);

  const getData = useCallback(() => {
    setLoading(true);
    setError(false);
    getRoleGroup({ search })
      .then((res) => {
        setLoading(false);
        setError(false);
        if (res?.items) {
          setData(res?.items);
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
