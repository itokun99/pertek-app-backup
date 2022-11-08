import { IVendorEntities } from "@general-types";
import ActionCellButton, { IActionCellButtonProperties } from "../../buttons/ActionCellButton";
import { ColumnType } from "../BaseTable/BaseTable.interface";
import { createTextAvatar } from "@utils/createAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Theme } from "@mui/material";

const optionActionCell = (
  record: IVendorEntities,
  onClickEdit: (id: number, record: IVendorEntities) => void,
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
  onClickEdit: (id: number, record: IVendorEntities) => void,
  onClickDelete: (id: number) => void,
  theme: Theme
): ColumnType[] {
  return [
    {
      title: "Nama Vendor",
      selector: "first_name",
      render: (text, record: IVendorEntities) => {
        const avatar = createTextAvatar(text);
        const { first_name = "-", last_name = "" } = record?.contact || {};
        const username = `${first_name} ${last_name}`;

        return (
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ backgroundColor: avatar.color }}>{avatar.name}</Avatar>
              <Box sx={{ ml: 1 }}>
                <Link href={`#`} color={theme.palette.text.primary}>
                  <Typography variant="subtitle1">{username}</Typography>
                </Link>
                <Typography variant="subtitle2">{record?.contact?.profile_type}</Typography>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      title: "No. Telp",
      selector: "phone_number",
      render: (_text, record: IVendorEntities) => {
        return (
          <Typography variant="body2">
            {record?.contact?.phones.length > 0 ? record?.contact?.phones[0].number : "-"}
          </Typography>
        );
      },
    },
    {
      title: "Email",
      selector: "emails",
      render: (_text, record: IVendorEntities) => {
        return (
          <Typography variant="body2">
            {record?.contact?.emails.length > 0 ? record?.contact?.emails[0].address : "-"}
          </Typography>
        );
      },
    },
    {
      title: "",
      selector: "action",
      align: "right",
      render: (_text, record: IVendorEntities) => {
        return <ActionCellButton options={optionActionCell(record, onClickEdit, onClickDelete)} />;
      },
    },
  ] as ColumnType[];
}
