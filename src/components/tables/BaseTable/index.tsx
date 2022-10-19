import * as React from "react";
import Table, { TableProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { IBaseTableProperties, KeyTypeString, ColumnType } from "./BaseTable.interface";
import { TableLoader } from "../../loader/TableLoader";
import ServerPagination from "../../Pagination/ServerPagination";

const createCheckableData = (
  data: {
    [key: string]: string;
  }[] = []
) => {
  return data.map((v) => {
    if (Boolean(v?.checked)) {
      return {
        ...v,
        checked: v?.checked,
      };
    } else {
      return {
        ...v,
        checked: false,
      };
    }
  });
};

const BaseTable: React.FC<IBaseTableProperties> = (props) => {
  const {
    columns = [],
    field = [],
    isRowSelection = false,
    rowSelection,
    loading = false,
    withPagination = false,
  } = props;

  const [tempData, setTempData] = React.useState([]);
  const isCheckedAll =
    tempData.length > 0 ? tempData.every((v: KeyTypeString) => v.checked) : false;
  const hasChecked = tempData.length > 0 ? tempData.some((v: KeyTypeString) => v.checked) : false;
  const selectedData = tempData.length > 0 ? tempData.filter((v: KeyTypeString) => v.checked) : [];

  const handleSelectedRow = (_event: any, row: KeyTypeString, checked: boolean) => {
    const newData = tempData.map((v: KeyTypeString) => {
      const rowSelectionKey =
        rowSelection && rowSelection?.selector ? (rowSelection.selector as keyof typeof v) : "";
      const rowSelectionKey2 =
        rowSelection && rowSelection?.selector ? (rowSelection.selector as keyof typeof row) : "";

      if (v[rowSelectionKey] === row[rowSelectionKey2]) {
        return {
          ...v,
          checked,
        };
      }

      return v;
    });

    const newSelectedData = newData.length > 0 ? newData.filter((v) => v.checked) : [];

    setTempData(newData as never[]);
    if (rowSelection?.onSelected) {
      rowSelection.onSelected(newSelectedData);
    }
  };

  const handleCheckedAll = () => {
    if (isCheckedAll) {
      const newData = tempData.map((v: KeyTypeString) => {
        return {
          ...v,
          checked: false,
        };
      });

      const newSelectedData = newData.length > 0 ? newData.filter((v) => v.checked) : [];

      if (rowSelection?.onSelected) {
        rowSelection.onSelected(newSelectedData);
      }

      setTempData(newData as never[]);
    } else {
      const newData = tempData.map((v: KeyTypeString) => {
        return {
          ...v,
          checked: true,
        };
      });

      const newSelectedData = newData.length > 0 ? newData.filter((v) => v.checked) : [];

      if (rowSelection?.onSelected) {
        rowSelection.onSelected(newSelectedData);
      }

      setTempData(newData as never[]);
    }
  };

  React.useEffect(() => {
    setTempData(createCheckableData(field as KeyTypeString[]) as never[]);
  }, [field]);

  if (loading) {
    return <TableLoader />;
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {isRowSelection && (
                <TableCell align="left">
                  <Checkbox
                    checked={isCheckedAll}
                    indeterminate={!isCheckedAll && hasChecked}
                    onChange={handleCheckedAll}
                  />
                </TableCell>
              )}
              {columns.map((col, index) => (
                <TableCell key={index} align={col.align}>
                  {col.title} {col.sorter && <span>sorter</span>}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tempData.map((row: KeyTypeString, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {isRowSelection && (
                  <TableCell component="th" scope="row" width={20} align="left">
                    <Checkbox
                      checked={Boolean(row && row?.checked)}
                      onChange={(e, checked) => handleSelectedRow(e, row, checked)}
                    />
                  </TableCell>
                )}
                {columns.map((colItem, colKey) => {
                  if (colItem.render) {
                    return (
                      <TableCell
                        component="th"
                        scope="row"
                        align={colItem.align}
                        width={colItem.width}
                        key={colKey}
                      >
                        {colItem.selector && row
                          ? colItem.render(row[colItem.selector], row)
                          : null}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      component="th"
                      scope="row"
                      align={colItem.align}
                      width={colItem.width}
                      key={colKey}
                    >
                      {colItem.selector && row ? row[colItem.selector] : null}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {withPagination && <ServerPagination total={field.length} />}
      </TableContainer>
    </>
  );
};

export default BaseTable;
