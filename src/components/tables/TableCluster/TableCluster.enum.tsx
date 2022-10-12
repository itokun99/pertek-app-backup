import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import ActionCellButton, { IActionCellButtonProperties } from "../../buttons/ActionCellButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const optionActionCell = (record: object) => {
  // you can abstract your record interface here
  const { id } = (record as { id: string }) || {};
  const options: IActionCellButtonProperties["options"] = [
    {
      label: "Edit",
      icon: <ModeEditOutlineOutlinedIcon />,
      onClick: () => alert(`${id} is clicked`),
    },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      color: "error",
      onClick: () => alert(`${id} is clicked`),
    },
  ];

  return options;
};

export const ClusterColumns: GridColDef[] = [
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
      return <ActionCellButton options={optionActionCell(row)} />;
    },
  },
];
