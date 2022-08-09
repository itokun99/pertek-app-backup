import { styled, Theme } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { theColors } from '../theme/base';

export interface DataGridTableProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

export const DataGridTable = styled(DataGrid)<DataGridTableProps>(({ theme }: { theme?: Theme }) => ({
  borderRadius: '16px',
  border: 'none',
  WebkitFontSmoothing: 'auto',
  '& .MuiDataGrid-root, .MuiDataGrid-cell:focus-within': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theColors.layout.general.bodyBg,
    marginLeft: theme?.spacing(1),
    marginRight: theme?.spacing(1),
    borderRadius: '12px',
  },
  '& .MuiDataGrid-row': {
    paddingLeft: theme?.spacing(1),
    paddingRight: theme?.spacing(1),
  },
  '& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeaders, .MuiDataGrid-cell': {
    borderBottom: 'none',
  },
}));
