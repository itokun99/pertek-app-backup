import { useState, useEffect, useCallback } from "react";
import { IUnit } from "@general-types";
import { getUnitByContactId } from "@service/unit";

export default function useParentTenancyList(contactId?: string) {
  const [data, setData] = useState<IUnit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = useCallback(() => {
    setLoading(true);
    setError(false);
    if (contactId !== undefined && contactId !== "" && contactId !== null) {
      getUnitByContactId(contactId)
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
  }, [contactId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    error,
    loading,
  };
}
