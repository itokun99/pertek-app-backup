import ActionCellButton, { IActionCellButtonProperties } from '@components/buttons/ActionCellButton';
import { IBooking } from '@types';
import BaseTable from '../BaseTable';
import { ColumnType } from '../BaseTable/BaseTable.interface';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { fDateTime } from '@utils/formatTime';
import { Stack, Typography } from '@mui/material';
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
    <Label color={color} variant='ghost'>
      {label}
    </Label>
  );
}

function generateColumns(onEdit: (id: number, record: IBooking) => void, onDelete: (id: number) => void) {
  return [
    {
      title: 'Kode Booking',
      selector: 'code',
      render: (_text) => <Typography variant='subtitle2'>{_text}</Typography>,
    },
    {
      title: 'Fasilitas',
      selector: 'facilitas',
      render: (_text, record: IBooking) => {
        return record.facility.name;
      },
    },
    {
      title: 'Pemesan',
      selector: 'name',
      render: (_text, record: IBooking) => {
        return (
          <Stack direction='column'>
            <Typography variant='subtitle1'>
              {record.contact.first_name} {record.contact.last_name}
            </Typography>
            <Typography variant='body2'>{record.unit}</Typography>
          </Stack>
        );
      },
    },
    {
      title: 'Slot Booking',
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
  return (
    <BaseTable
      columns={generateColumns(onEdit, onDelete)}
      field={data}
      loading={isLoading}
      withPagination
      total={totalData}
    ></BaseTable>
  );
};
