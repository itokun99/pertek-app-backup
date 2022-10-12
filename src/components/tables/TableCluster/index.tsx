import { DataGrid } from "@mui/x-data-grid";
import { PropsWithChildren, memo } from "react";
import { ClusterColumns } from "./TableCluster.enum";

const TableCluster = ({
  data,
  loading = false,
}: PropsWithChildren & { data: []; loading: boolean }) => {
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
      columns={ClusterColumns}
      rows={data}
    />
  );
};

export default memo(TableCluster);
