import { styled } from "@mui/material";
import { DataGrid as MuiDataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";

const DataGrid = styled(MuiDataGrid)({
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "transparent",
  },
});

export interface UplaoderTableProps {
  csvFile: File;
}

export const UploaderTable = ({ csvFile }: UplaoderTableProps) => {
  const [dataTable, setDataTable] = useState<{
    columns: GridColDef[];
    rows: any[];
  }>({
    columns: [],
    rows: [],
  });

  const tableHeader = useMemo<Array<GridColDef>>(() => [], []);
  const tableRows = useMemo<Array<{ [key: string]: any }>>(() => [], []);

  const csvArray: Array<string[] | undefined> = useMemo(() => [], []);

  const fileReader = useMemo(() => new FileReader(), []);

  fileReader.onload = useCallback(
    (e: ProgressEvent<FileReader>) => {
      csvArray.length = 0;
      const value = e.target?.result?.toString();
      const endOfLineIndex = value?.indexOf("\r\n") || 0;

      const parsedCsvHeaders = value?.slice(0, endOfLineIndex).split(/[;,]/);
      const parsedCsvRows = value?.slice(endOfLineIndex + 2).split("\r\n");

      const parsedCsvData = parsedCsvRows?.map((row) => row.split(/[,;]/));

      parsedCsvHeaders?.forEach((header) => {
        tableHeader.push({
          flex: 1,
          field: header,
        });
      });

      parsedCsvData?.forEach((data, index) => {
        let row: { [key: string]: any } = { id: index };

        data.forEach((cell, cellIndex) => {
          const key =
            (parsedCsvHeaders && parsedCsvHeaders[cellIndex]) || "unknown";
          row[key] = cell;
        });

        tableRows.push(row);
      });
    },
    [csvArray, tableHeader, tableRows]
  );

  fileReader.onloadend = () =>
    setDataTable({
      columns: tableHeader,
      rows: tableRows,
    });

  useMemo(() => {
    fileReader.readAsText(csvFile);
  }, [fileReader, csvFile]);

  return (
    <>
      <DataGrid
        headerHeight={40}
        autoHeight
        disableColumnSelector
        hideFooterSelectedRowCount
        columns={dataTable.columns}
        rows={dataTable.rows}
      />
    </>
  );
};
