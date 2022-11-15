import ActionCellButton, {
  IActionCellButtonProperties,
} from "@components/buttons/ActionCellButton";
import { IBooking } from "@types";
import BaseTable from "../BaseTable";
import { ColumnType } from "../BaseTable/BaseTable.interface";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { fDateTime } from "@utils/formatTime";
import { Avatar, Box, Stack, Theme, Typography, useTheme } from "@mui/material";
import Label from "@components/Label";

import Link from "next/link";

export interface TableBookingProps {
  isLoading: boolean;
  data: IBooking[];
  totalData: number;
  onEdit: (id: number, record: IBooking) => void;
  onDelete: (id: number) => void;
}

const optionActionCell = (
  record: IBooking,
  onEdit: (id: number, record: IBooking) => void,
  onDelete: (id: number) => void
) => {
  // you can abstract your record interface here
  const { id } = record || {};
  const options: IActionCellButtonProperties["options"] = [
    {
      label: "Update Status",
      icon: <ModeEditOutlineOutlinedIcon />,
      onClick: () => onEdit(id, record),
    },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      color: "error",
      onClick: () => onDelete(id),
    },
  ];

  return options;
};

export function createBookingLabel(label: string) {
  let color = "default";
  switch (label.toLocaleLowerCase()) {
    case "requested":
      color = "info";
      break;
    case "ongoing":
      color = "warning";
      break;
    case "no show":
    case "canceled":
      color = "error";
      break;
    case "booked":
      color = "success";
  }

  return (
    <Label color={color} variant="outlined">
      {label}
    </Label>
  );
}

function getAvatarBgColor(status: string, theme: Theme) {
  switch (status.toLowerCase()) {
    case "requested":
      return theme.palette.info.main;
    case "ongoing":
      return theme.palette.warning.main;
    case "booked":
      return theme.palette.success.main;
    case "no show":
    case "canceled":
      return theme.palette.error.main;

    default:
      return theme.palette.grey[600];
  }
}

function generateColumns(
  onEdit: (id: number, record: IBooking) => void,
  onDelete: (id: number) => void,
  theme: Theme
): ColumnType[] {
  return [
    {
      title: "Kode Booking",
      selector: "code",
      render: (_text, record: IBooking) => {
        return (
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: getAvatarBgColor(record.status, theme) }}>
              <Typography variant="subtitle3" color={theme.palette.background.default}>
                {record.facility.code}
              </Typography>
            </Avatar>
            <Box>
              <Typography variant="subtitle2">
                <Link href="#">{_text}</Link>
              </Typography>
              <Typography variant="subtitle2" color={theme.palette.grey[600]}>
                {record.facility.name}
              </Typography>
            </Box>
          </Stack>
        );
      },
    },
    {
      title: "Pemesan",
      selector: "name",
      render: (_text, record: IBooking) => {
        const { first_name: firstName = "-", last_name: lastName = "" } = record.contact || {};
        return (
          <Stack direction="column">
            <Typography variant="subtitle2">
              {firstName} {lastName}
            </Typography>
            <Typography variant="subtitle2" color={theme.palette.grey[600]}>
              {record.unit}
            </Typography>
          </Stack>
        );
      },
    },
    {
      title: "Tanggal Booking",
      selector: "created_at",
      render: (_text) => fDateTime(_text),
    },
    {
      title: "Tanggal Penggunaan",
      selector: "slot_booking",
      render: (_text, record: IBooking) => {
        return (
          fDateTime(record.start as unknown as string) +
          " - " +
          fDateTime(record.end as unknown as string)
        );
      },
    },
    {
      title: "Status",
      selector: "status",
      render: (text: string) => createBookingLabel(text),
    },
    {
      title: "",
      selector: "action",
      align: "right",
      render: (_text, record: IBooking) => {
        return <ActionCellButton options={optionActionCell(record, onEdit, onDelete)} />;
      },
    },
  ] as ColumnType[];
}

export const TableBooking = ({
  onEdit,
  onDelete,
  data,
  isLoading,
  totalData,
}: TableBookingProps) => {
  const theme = useTheme();
  return (
    <BaseTable
      columns={generateColumns(onEdit, onDelete, theme)}
      field={data}
      loading={isLoading}
      withPagination
      total={totalData}
    />
  );
};
