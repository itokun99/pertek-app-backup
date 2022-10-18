// import { DataGrid } from "@mui/x-data-grid";
import { PropsWithChildren, memo, useState, useEffect } from "react";
import { generateColumns } from "./index.enum";
import LinearProgress from '@mui/material/LinearProgress';
import { TableLoader } from '../../loader/TableLoader';
import { IUnit } from '../../../types';
import BaseTable from '../BaseTable';

export interface ITableUnitProps {
  data: Array<IUnit>,
  loading: boolean,
  ready: boolean,
  onClickEdit: (id: number, record: IUnit) => void,
  onClickDelete: (id: number) => void
}

const TableCluster = ({
  data,
  ready,
  loading = false,
  onClickEdit,
  onClickDelete
}: PropsWithChildren & ITableUnitProps) => {

  if (!ready) {
    return <TableLoader />
  }

  return (
    <BaseTable
      columns={generateColumns(onClickEdit, onClickDelete)}
      field={data}
      loading={loading}
    />
  );
};

export default memo(TableCluster);
