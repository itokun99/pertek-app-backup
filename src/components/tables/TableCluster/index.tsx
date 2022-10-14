import { DataGrid } from "@mui/x-data-grid";
import { PropsWithChildren, memo, useState, useEffect } from "react";
import { generateColumns } from "./TableCluster.enum";
import LinearProgress from '@mui/material/LinearProgress';
import { TableLoader } from '../../loader/TableLoader';
import { ICluster } from '../../../types';

export interface ITableClusterProps {
  data: Array<ICluster>,
  loading: boolean,
  ready: boolean,
  onClickEdit: (id: number, record: ICluster) => void,
  onClickDelete: (id: number) => void
}

const TableCluster = ({
  data,
  ready,
  loading = false,
  onClickEdit,
  onClickDelete
}: PropsWithChildren & ITableClusterProps) => {

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

export default memo(TableCluster);
