import Link from '@mui/material/Link';
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import ActionCellButton, { IActionCellButtonProperties } from "../../buttons/ActionCellButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IUnit } from '../../../types';





const optionActionCell = (record: IUnit, onClickEdit: (id: number, record: IUnit) => void, onClickDelete: (id: number) => void) => {
  // you can abstract your record interface here
  const { id } = record || {};
  const options: IActionCellButtonProperties["options"] = [
    {
      label: "Edit",
      icon: <ModeEditOutlineOutlinedIcon />,
      onClick: () => onClickEdit(id, record),
    },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      color: "error",
      onClick: () => onClickDelete(id),
    },
  ];

  return options;
};


export function generateColumns(onClickEdit: (id: number, record: IUnit) => void, onClickDelete: (id: number) => void): GridColDef[] {
  return [
    {
      headerName: "Nama Unit",
      field: "name",
      flex: 1
    },
    {
      headerName: "Total Area",
      field: "total_area",
      flex: 1
    },
    {
      headerName: "Kapasitas Listrik",
      field: "electrical_capacity",
      flex: 1
    },
    {
      headerName: "Dokumen Serah Terima",
      field: "bast_docs",
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        const { bast_docs }: IUnit = params.row || {};
        if (!bast_docs || bast_docs.length === 0) {
          return '-'
        }

        return (
          <>
            {bast_docs.map((v, i) => {
              return <Link key={i}>{v}</Link>
            })}
          </>
        )
      },
    },
    {
      headerName: "Tanggal Serah Terima",
      field: "bast_date",
      flex: 1,
      renderCell: (params: any) => {
        const { bast_date }: IUnit = params.row || {};
        return bast_date ? bast_date : '-'
      },
    },
    {
      headerName: "",
      field: "action",
      sortable: false,
      align: "right",
      renderCell: ({ row }) => {
        return <ActionCellButton options={optionActionCell(row, onClickEdit, onClickDelete)} />;
      },
    },
  ];
}
