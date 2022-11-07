import { useState, useEffect, useCallback } from "react";
import { ITenantParent } from "@general-types";
import { getTenantParentByUnit } from "@service/tenant";

export default function useParentTenancyList(unitId?: string) {
  const [data, setData] = useState<ITenantParent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = useCallback(() => {
    setLoading(true);
    setError(false);
    if (unitId !== undefined && unitId !== "") {
      getTenantParentByUnit(unitId)
        .then((data) => {
          setLoading(false);
          setError(false);
          if (data) {
            setData(data);
          } else {
            setError(true);
            setData([]);
          }
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [unitId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    error,
    loading,
  };
}
