import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React from "react";
import FilterSelect from "./FilterSelectStatus";
import BaseDialogForm from "@components/dialog/BaseDialogForm";
import useForm from "@hooks/useForm";
import { useRouter } from "next/router";

interface IDialogFilter {
  visible: boolean;
  onClose: () => void;
}

export type BasicObject = Record<string, string | string[] | number | number[] | null | undefined>;

const isArray = (value: any) => {
  return Array.isArray(value);
};

const isEmpty = (value: any) => {
  return value === null || value === undefined || value === "";
};

export const clearEmptyObject = (object: BasicObject) => {
  const cleanedObject: BasicObject = {};
  Object.keys(object).forEach((key: string) => {
    if (
      object[key] === null ||
      object[key] === undefined ||
      object[key] === "" ||
      object[key] === "[]" ||
      (isArray(object[key]) && isEmpty(object[key]))
    ) {
      return;
    }
    cleanedObject[key] = object[key];
  });
  return cleanedObject;
};

export const clearFilterObject = (object: BasicObject) => {
  const cleanedObject: BasicObject = clearEmptyObject(object);

  Object.keys(cleanedObject).forEach((key: string) => {
    if (object[key] === "*") {
      delete cleanedObject[key];
    }
  });
  return cleanedObject;
};

const DialogFilter: React.FC<IDialogFilter> = ({ visible, onClose }) => {
  const router = useRouter();
  const [formFilter, setFormFilter, resetFilterForm] = useForm({
    status: "Active",
  });

  const handleSelectChange = (name: string, value: any) => {
    setFormFilter(name, value);
  };

  const applyFilter = () => {
    const filterOutput = clearFilterObject({
      ...router.query,
      status: formFilter.status,
      page: "1",
    });
    router.push({
      pathname: router.pathname,
      query: filterOutput,
    });
  };

  // this is for reset filter and it should be set general later
  const filterOptions = [
    {
      query: ["status"],
    },
  ];

  const clearFilter = () => {
    const { query } = router;
    // filter option set on enum in each file, it should be set general later
    filterOptions.forEach((option) => {
      option.query.forEach((key) => {
        delete query[key];
      });
    });

    router.push({
      query,
    });
    resetFilterForm();
  };

  return (
    <BaseDialogForm
      visible={visible}
      onClose={onClose}
      title="Fitler Karyawan"
      action={
        <>
          <Button variant="outlined" color="primary" onClick={clearFilter}>
            Clear
          </Button>
          <Button variant="contained" color="primary" onClick={applyFilter}>
            Filter
          </Button>
        </>
      }
    >
      <Box className="">
        <Grid container gap={3}>
          <Grid item xs={6}>
            {/* filter select should set general later */}
            <FilterSelect onChange={handleSelectChange} value={formFilter.status} />
          </Grid>
          <Grid item xs={6}>
            {/* <FilterSelect /> */}
          </Grid>
        </Grid>
      </Box>
    </BaseDialogForm>
  );
};

export default DialogFilter;
