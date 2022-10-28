import ActionCellButton, { IActionCellButtonProperties } from '@components/buttons/ActionCellButton';
import { DeleteOutlineOutlined, ModeEditOutlineOutlined } from '@mui/icons-material';
import { IFacility } from '@types';
import { fGetTime } from '@utils/formatTime';
import BaseTable from '../BaseTable';
import { ColumnType } from '../BaseTable/BaseTable.interface';
import Label from '../../Label';
import { createTextAvatar } from '@utils/createAvatar';
import { Avatar, Badge, Button, Stack, Theme, Typography, useTheme } from '@mui/material';

export interface TableFacilityProps {
  facilities: IFacility[];
  onEdit: (id: number, facility: IFacility) => void;
  onDelete: (id: number) => void;
  openDetail: (facility: IFacility) => void;
}

const optionActionCell = (
  record: IFacility,
  onEdit: (id: number, facility: IFacility) => void,
  onDelete: (id: number) => void
) => {
  return [
    {
      label: 'Edit',
      icon: <ModeEditOutlineOutlined />,
      onClick: () => onEdit(record.id, record),
    },
    {
      label: 'Delete',
      icon: <DeleteOutlineOutlined />,
      color: 'error',
      onClick: () => onDelete(record.id),
    },
  ] as IActionCellButtonProperties['options'];
};

const generateColumns = (
  onEdit: (id: number, record: IFacility) => void,
  onDelete: (id: number) => void,
  openDetail: (facility: IFacility) => void,
  theme: Theme
) => {
  return [
    {
      title: 'Nama Fasilitas',
      selector: 'name',
      render: (_text, record: IFacility) => {
        const avatar = createTextAvatar(_text);
        return (
          <Stack direction='row' alignItems='center' spacing={2}>
            <Avatar sx={{ backgroundColor: avatar.color }}>{avatar.name}</Avatar>
            <Button sx={{ color: theme.palette.text.primary }} onClick={() => openDetail(record)}>
              <Typography variant='subtitle1'>{_text}</Typography>
            </Button>
          </Stack>
        );
      },
    },
    {
      title: 'Kode',
      selector: 'code',
      render(text) {
        return <Badge color='primary'>{text}</Badge>;
      },
    },
    {
      title: 'Kateogri',
      selector: 'category',
      render: (_text, record: IFacility) => record.category.name,
    },
    {
      title: 'Jam Operasional Standar',
      selector: 'default_operational_hour',
      render: (_text, record: IFacility) =>
        `${fGetTime(record.default_open_hour)} - ${fGetTime(record.default_close_hour)}`,
    },
    {
      title: 'Min - Max Durasi Order (Menit)',
      selector: 'order_duration',
      render: (_text, record: IFacility) => `${record.min_order_duration} Menit - ${record.max_order_duration} Menit`,
    },
    {
      title: 'Harga Sewa',
      selector: 'price',
      render: (_text, record: IFacility) =>
        record.price === 0 ? (
          <Label variant='ghost' color='success'>
            Free
          </Label>
        ) : (
          `Rp. ${record.price}`
        ),
    },
    {
      title: '',
      selector: 'action',
      align: 'right',
      render: (_text, record: IFacility) => {
        return <ActionCellButton options={optionActionCell(record, onEdit, onDelete)} />;
      },
    },
  ] as ColumnType[];
};

const TableFacility = ({ facilities, onDelete, onEdit, openDetail }: TableFacilityProps) => {
  const theme = useTheme();
  return <BaseTable columns={generateColumns(onEdit, onDelete, openDetail, theme)} field={facilities}></BaseTable>;
};

export default TableFacility;
