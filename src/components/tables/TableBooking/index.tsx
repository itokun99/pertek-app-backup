import ActionCellButton, { IActionCellButtonProperties } from '@components/buttons/ActionCellButton';
import { IBooking } from '@types';
import BaseTable from '../BaseTable';
import { ColumnType } from '../BaseTable/BaseTable.interface';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { fDate, fDateTime } from '@utils/formatTime';
import { Avatar, Box, Stack, Theme, Typography, useTheme } from '@mui/material';
import Label from '@components/Label';

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
  const options: IActionCellButtonProperties['options'] = [
    {
      label: 'Edit',
      icon: <ModeEditOutlineOutlinedIcon />,
      onClick: () => onEdit(id, record),
    },
    {
      label: 'Delete',
      icon: <DeleteOutlineOutlinedIcon />,
      color: 'error',
      onClick: () => onDelete(id),
    },
  ];

  return options;
};

export function createBookingLabel(label: string) {
  let color = 'default';
  switch (label.toLocaleLowerCase()) {
    case 'requested':
      color = 'info';
      break;
    case 'ongoing':
      color = 'warning';
      break;
    case 'no show':
    case 'canceled':
      color = 'error';
      break;
    case 'booked':
      color = 'success';
  }

  return (
    <Label color={color} variant='outlined'>
      {label}
    </Label>
  );
}

function getAvatarBgColor(status: string, theme: Theme) {
  switch (status.toLowerCase()) {
    case 'requested':
      return theme.palette.info.main;
    case 'ongoing':
      return theme.palette.warning.main;
    case 'booked':
      return theme.palette.success.main;
    case 'no show':
    case 'canceled':
      return theme.palette.error.main;

    default:
      return theme.palette.grey[600];
  }
}

function generateColumns(onEdit: (id: number, record: IBooking) => void, onDelete: (id: number) => void, theme: Theme) {
  return [
    {
      title: 'Kode Booking',
      selector: 'code',
      render: (_text, record: IBooking) => {
        return (
          <Stack direction='row' spacing={2}>
            <Avatar sx={{ bgcolor: getAvatarBgColor(record.status, theme) }}>
              <Typography variant='subtitle3' color={theme.palette.background.default}>
                {record.facility.code}
              </Typography>
            </Avatar>
            <Box>
              <Typography variant='subtitle2'>{_text}</Typography>
              <Typography variant='subtitle2' color={theme.palette.grey[600]}>
                {record.facility.name}
              </Typography>
            </Box>
          </Stack>
        );
      },
    },
    {
      title: 'Pemesan',
      selector: 'name',
      render: (_text, record: IBooking) => {
        return (
          <Stack direction='column'>
            <Typography variant='subtitle2'>
              {record.contact.first_name} {record.contact.last_name}
            </Typography>
            <Typography variant='subtitle2' color={theme.palette.grey[600]}>
              {record.unit}
            </Typography>
          </Stack>
        );
      },
    },
    {
      title: 'Tanggal Booking',
      selector: 'created_at',
      render: (_text) => fDateTime(_text),
    },
    {
      title: 'Tanggal Penggunaan',
      selector: 'slot_date',
      render: (_text, record: IBooking) => {
        return fDateTime(record.slot_date);
      },
    },
    {
      title: 'Status',
      selector: 'status',
      render: (_text) => createBookingLabel(_text),
    },
    {
      title: '',
      selector: 'action',
      align: 'right',
      render: (_text, record: IBooking) => {
        return <ActionCellButton options={optionActionCell(record, onEdit, onDelete)} />;
      },
    },
  ] as ColumnType[];
}

export const TableBookingView = ({ onEdit, onDelete, data, isLoading, totalData }: TableBookingProps) => {
  const theme = useTheme();
  return (
    <BaseTable
      columns={generateColumns(onEdit, onDelete, theme)}
      field={data}
      loading={isLoading}
      withPagination
      total={totalData}
    ></BaseTable>
  );
};
