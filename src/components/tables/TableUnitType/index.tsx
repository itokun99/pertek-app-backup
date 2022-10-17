import { DataGrid } from "@mui/x-data-grid";
import { PropsWithChildren, memo, useState, useEffect } from "react";
import { generateColumns } from "./index.enum";
import LinearProgress from '@mui/material/LinearProgress';
import { TableLoader } from '../../loader/TableLoader';
import { IUnitType } from '../../../types';

export interface ITableUnitTypeProps {
  data: Array<IUnitType>,
  loading: boolean,
  ready: boolean,
  onClickEdit: (id: number, record: IUnitType) => void,
  onClickDelete: (id: number) => void
}

const TableUnitType = ({
  data,
  ready,
  loading = false,
  onClickEdit,
  onClickDelete
}: PropsWithChildren & ITableUnitTypeProps) => {

  if (!ready) {
    return <TableLoader />
  }

  return (
    <DataGrid
      components={{ LoadingOverlay: LinearProgress }}
      headerHeight={40}
      density={"comfortable"}
      disableColumnSelector
      checkboxSelection
      hideFooterSelectedRowCount
      disableSelectionOnClick
      showCellRightBorder={false}
      autoHeight
      loading={loading}
      columns={generateColumns(onClickEdit, onClickDelete)}
      rows={data}
    />
  );
};

export default memo(TableUnitType);