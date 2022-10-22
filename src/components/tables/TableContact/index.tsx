// import { DataGrid } from "@mui/x-data-grid";
import { PropsWithChildren, memo, useState, useEffect } from "react";
import { generateColumns } from "./index.enum";
import { TableLoader } from "../../loader/TableLoader";
import { IContact } from "@types";
import BaseTable from "../BaseTable";

export interface ITableContactProps {
  data: Array<IContact>;
  loading: boolean;
  ready: boolean;
  onClickEdit: (id: number, record: IContact) => void;
  onClickDelete: (id: number) => void;
}

const TableContact = ({
  data,
  ready,
  loading = false,
  onClickEdit,
  onClickDelete,
}: PropsWithChildren & ITableContactProps) => {
  if (!ready) {
    return <TableLoader />;
  }

  return (
    <>
      <BaseTable
        columns={generateColumns(onClickEdit, onClickDelete)}
        field={data}
        loading={loading}
        withPagination
      />
    </>
  );
};

export default memo(TableContact);
