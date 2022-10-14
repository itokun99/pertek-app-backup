import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import ActionCellButton, { IActionCellButtonProperties } from "../../buttons/ActionCellButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ICluster } from '../../../types';

const optionActionCell = (record: ICluster, onClickEdit: (id: number, record: ICluster) => void, onClickDelete: (id: number) => void) => {
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


export function generateColumns(onClickEdit: (id: number, record: ICluster) => void, onClickDelete: (id: number) => void): GridColDef[] {
  return [
    {
      headerName: "Nama Klaster",
      field: "name",
      flex: 1,
    },
    {
      headerName: "Properti",
      field: "property_id",
      flex: 1,
      renderCell: (params: any) => {
        const { property } = params.row || {};
        return property ? property.name : "-";
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
