import {
  Box,
  Button,
  Dialog,
  DialogProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Typography,
} from '@mui/material';
import { DataGrid as MuiDataGrid, GridColDef } from '@mui/x-data-grid';
import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';

const MappingDialog = ({ open, setOpen, columns }: DialogProps & { setOpen: Function; columns: GridColDef[] }) => {
  return (
    <Dialog open={open}>
      <Typography variant='h5'>Tabel Mapping</Typography>
      <DataGrid rows={[]} columns={columns} />
      <Button onClick={() => setOpen(false)}>Close</Button>
    </Dialog>
  );
};

const DataGrid = styled(MuiDataGrid)({
  '& .MuiDataGrid-row:hover': {
    backgroundColor: 'transparent',
  },
});

export interface UplaoderTableProps {
  refColumns: { [key: string]: string };
  csvFile: File;
}

export const UplaoderTable = ({ refColumns, csvFile }: UplaoderTableProps) => {
  const rows: Array<{ [key: string]: any } | null> = [];
  const [unmappedColumn, setUnmappedColumn] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedItemColumns, setSelectedItemColumns] = useState([]);

  const csvArray: Array<string[] | undefined> = useMemo(() => [], []);
  const columnFields = useMemo(() => Object.keys(refColumns), [refColumns]);

  const handleChange = useCallback(
    (e: SelectChangeEvent, index: number) => {
      selectedItemColumns[index] = e.target.value as never;
      setSelectedItemColumns(selectedItemColumns);
    },
    [selectedItemColumns]
  );

  const columns = columnFields.map((field, fieldId) => {
    const selectItem = csvArray[0]?.map((f, i) => {
      return (
        <MenuItem key={i} value={f} selected={selectedItemColumns[fieldId] === f}>
          {f}
        </MenuItem>
      );
    });
    return {
      flex: 1,
      field,
      headerName: refColumns[field],
      renderCell: () => {
        return (
          <FormControl>
            <InputLabel id={`item-${fieldId}`}>Kolom</InputLabel>
            <Select
              label='Kolom'
              sx={{ minWidth: 120, height: 50 }}
              onChange={(e) => handleChange(e, fieldId)}
              value={selectedItemColumns[fieldId]}
            >
              {selectItem}
            </Select>
          </FormControl>
        );
      },
    } as GridColDef;
  });
  //   }, [columnFields, refColumns, selectedItemColumns]);

  const fileReader = useMemo(() => new FileReader(), []);

  fileReader.onload = useCallback(
    (e: ProgressEvent<FileReader>) => {
      csvArray.length = 0;
      const value = e.target?.result?.toString().replaceAll('\r', '');
      const endOfLineIndex = value?.indexOf('\n') || 0;

      const parsedCsvHeaders = value?.slice(0, endOfLineIndex).split(/[;,]/);
      const parsedCsvData = value?.slice(endOfLineIndex + 1).split(/[,;]/);

      csvArray.push(parsedCsvHeaders);
      csvArray.push(parsedCsvData);
    },
    [csvArray]
  );

  fileReader.onloadend = () => setOpenDialog(true);

  useMemo(() => {
    fileReader.readAsText(csvFile);
  }, [fileReader, csvFile]);

  return (
    <>
      <MappingDialog open={openDialog} setOpen={setOpenDialog} columns={columns} />
      <DataGrid
        headerHeight={40}
        rowHeight={80}
        hideFooter
        autoHeight
        disableColumnSelector
        columns={columns}
        rows={[{ id: 1 }]}
      />
    </>
  );
};
