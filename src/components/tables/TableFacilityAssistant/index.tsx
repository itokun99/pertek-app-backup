import ActionCellButton, {
  IActionCellButtonProperties,
} from "@components/buttons/ActionCellButton";
import { DeleteOutlineOutlined, ModeEditOutlineOutlined } from "@mui/icons-material";
import { IFacility, IFacilityAssistant } from "@types";
import { fGetTime } from "@utils/formatTime";
import BaseTable from "../BaseTable";
import { ColumnType } from "../BaseTable/BaseTable.interface";
import Label from "../../Label";
import { createTextAvatar } from "@utils/createAvatar";
import { Avatar, Badge, Button, Stack, Theme, Typography, useTheme } from "@mui/material";

export interface TableFacilityAssistantProps {
  assistants: IFacilityAssistant[];
  onEdit: (id: string) => void;
  onDelete: (id: number) => void;
  openDetail: (assistant: IFacilityAssistant) => void;
}

const optionActionCell = (
  record: IFacilityAssistant,
  onEdit: (id: string) => void,
  onDelete: (id: number) => void
) => {
  return [
    {
      label: "Edit",
      icon: <ModeEditOutlineOutlined />,
      onClick: () => onEdit(String(record.id)),
    },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlined />,
      color: "error",
      onClick: () => onDelete(record.id),
    },
  ] as IActionCellButtonProperties["options"];
};

const generateColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: number) => void,
  openDetail: (assistant: IFacilityAssistant) => void,
  theme: Theme
) => {
  return [
    {
      title: "Nama Asisten Fasilitas",
      selector: "name",
      render: (_text, record: IFacilityAssistant) => {
        const { contact } = record || {};
        const name = `${contact?.first_name} ${contact?.last_name}`;
        const avatar = createTextAvatar(name);
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ backgroundColor: avatar.color }}>{avatar.name}</Avatar>
            <Button sx={{ color: theme.palette.text.primary }} onClick={() => openDetail(record)}>
              <Typography variant="subtitle1">{name}</Typography>
            </Button>
          </Stack>
        );
      },
    },
    {
      title: "Kode",
      selector: "staff_code",
      render(text) {
        return <Badge color="primary">{text}</Badge>;
      },
    },
    {
      title: "Kateogri",
      selector: "category",
      render: (_text, record: IFacilityAssistant) => record.facility_category.name,
    },
    {
      title: "",
      selector: "action",
      align: "right",
      render: (_text, record: IFacilityAssistant) => {
        return <ActionCellButton options={optionActionCell(record, onEdit, onDelete)} />;
      },
    },
  ] as ColumnType[];
};

const TableFacilityAssistant = ({
  assistants,
  onDelete,
  onEdit,
  openDetail,
}: TableFacilityAssistantProps) => {
  const theme = useTheme();
  return (
    <BaseTable
      columns={generateColumns(onEdit, onDelete, openDetail, theme)}
      field={assistants}
    ></BaseTable>
  );
};

export default TableFacilityAssistant;
