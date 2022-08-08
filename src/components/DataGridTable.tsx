import { styled } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

export interface DataGridTableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

export const DataGridTable = styled(DataGrid)<DataGridTableProps>(({ theme }: { theme?: any }) => ({
  borderRadius: '16px',
  border: 'none',
}));
