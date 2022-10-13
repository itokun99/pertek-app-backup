import { DataGrid } from "@mui/x-data-grid";
import { PropsWithChildren, memo } from "react";
import { generateColumns } from "./TableCluster.enum";

export interface ITableItem {
  name: string;
  properti_id: string;
}
export interface ITableClusterProps {
  data: Array<ITableItem>,
  loading: boolean,
  onClickEdit: (id: string, record: object) => void,
  onClickDelete: (id: string, record: object) => void
}

const TableCluster = ({
  data,
  loading = false,
  onClickEdit,
  onClickDelete
}: PropsWithChildren & ITableClusterProps) => {
  return (
    <DataGrid
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
