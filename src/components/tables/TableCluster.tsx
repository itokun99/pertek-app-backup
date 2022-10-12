import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useTheme from "@mui/material/styles/useTheme";
import { Theme } from "@mui/material/styles/createTheme";
import { PropsWithChildren, memo } from "react";

const generateTableColumns = (theme: Theme) =>
  [
    {
      headerName: "Nama Klaster",
      field: "name",
      flex: 1,
    },
    {
      headerName: "Properti",
      field: "property_id",
      flex: 1,
    },
  ] as GridColDef[];

const TableCluster = ({
  data,
  loading = false,
}: PropsWithChildren & { data: []; loading: boolean }) => {
  const theme = useTheme();
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
      columns={generateTableColumns(theme)}
      rows={data}
    />
  );
};

export default memo(TableCluster);
