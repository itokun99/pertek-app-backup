// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

export default function DataGrid(theme: Theme) {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `none`,
          '& .MuiTablePagination-root': {
            borderTop: 0,
          },

          '& .MuiDataGrid-toolbarContainer': {
            // padding: theme.spacing(2),
            backgroundColor: theme.palette.background.default,
            '& .MuiButton-root': {
              marginRight: theme.spacing(1.5),
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
          },
          '& .MuiDataGrid-cell, .MuiDataGrid-columnsContainer': {
            borderBottom: `none`,
          },
          '& .MuiDataGrid-root, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeadersInner': {},
          '& .MuiDataGrid-row': {
            // paddingLeft: theme?.spacing(1),
            // paddingRight: theme?.spacing(1),
          },
          '& .MuiDataGrid-columnHeaders, .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.grey[200],
            borderRadius: theme.shape.borderRadius,
            // marginLeft: theme?.spacing(1),
            // marginRight: theme?.spacing(1),
          },
          '& .MuiDataGrid-columnSeparator': {
            color: 'transparent',
          },
          '& .MuiDataGrid-columnHeader[data-field="__check__"]': {
            padding: 0,
          },
        },
      },
    },
    MuiGridMenu: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-gridMenuList': {
            // boxShadow: theme.customShadows.z20,
            borderRadius: theme.shape.borderRadius,
          },
          '& .MuiMenuItem-root': {
            ...theme.typography.body2,
          },
        },
      },
    },
    MuiGridFilterForm: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5, 0),
          '& .MuiFormControl-root': {
            margin: theme.spacing(0, 0.5),
          },
          '& .MuiInput-root': {
            marginTop: theme.spacing(3),
            '&::before, &::after': {
              display: 'none',
            },
            '& .MuiNativeSelect-select, .MuiInput-input': {
              ...theme.typography.body2,
              padding: theme.spacing(0.75, 1),
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.background.default,
            },
            '& .MuiSvgIcon-root': {
              right: 4,
            },
          },
        },
      },
    },
    MuiGridPanelFooter: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          justifyContent: 'flex-end',
          '& .MuiButton-root': {
            '&:first-of-type': {
              marginRight: theme.spacing(1.5),
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
            '&:last-of-type': {
              color: theme.palette.common.white,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            },
          },
        },
      },
    },
  };
}
