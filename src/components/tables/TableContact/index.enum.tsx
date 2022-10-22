import Link from "@mui/material/Link";
import ActionCellButton, { IActionCellButtonProperties } from "../../buttons/ActionCellButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IContact } from "@types";
import { ColumnType } from "../BaseTable/BaseTable.interface";

const optionActionCell = (
  record: IContact,
  onClickEdit: (id: number, record: IContact) => void,
  onClickDelete: (id: number) => void
) => {
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

export function generateColumns(
  onClickEdit: (id: number, record: IContact) => void,
  onClickDelete: (id: number) => void
): ColumnType[] {
  return [
    {
      title: "Nama Lengkap",
      selector: "first_name",
      render: (_text, record: IContact) => record.last_name ? record.first_name + " " + record.last_name : _text
    },
    {
      title: "Identitas",
      selector: "identity",
      render: (_text, record: IContact) => record.identity_type && record.identity ? record.identity + " - " + record.identity_type : "-"
    },
    {
      title: "Status Registrasi",
      selector: "registration_status",
    },
    {
      title: "",
      selector: "action",
      align: "right",
      render: (_text, record: IContact) => {
        return <ActionCellButton options={optionActionCell(record, onClickEdit, onClickDelete)} />;
      },
    },
  ] as ColumnType[];
}
