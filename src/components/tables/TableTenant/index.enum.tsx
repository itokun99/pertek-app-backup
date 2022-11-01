import { ITenant } from '@general-types';
import ActionCellButton, { IActionCellButtonProperties } from '../../buttons/ActionCellButton';
import { ColumnType } from '../BaseTable/BaseTable.interface';
import { createTextAvatar } from '@utils/createAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Label from '../../Label';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { fDate } from '@utils/formatTime';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Chip, Theme } from '@mui/material';

const optionActionCell = (
  record: ITenant,
  onClickEdit: (id: number, record: ITenant) => void,
  onClickDelete: (id: number) => void
) => {
  // you can abstract your record interface here
  const { id } = record || {};
  const options: IActionCellButtonProperties['options'] = [
    {
      label: 'Edit',
      icon: <ModeEditOutlineOutlinedIcon />,
      onClick: () => onClickEdit(id, record),
    },
    {
      label: 'Delete',
      icon: <DeleteOutlineOutlinedIcon />,
      color: 'error',
      onClick: () => onClickDelete(id),
    },
  ];

  return options;
};

function createStatusLabel(status: string) {
  switch (status) {
    case 'Verified':
      return (
        <Label variant='ghost' color='success'>
          {status}
        </Label>
      );
    case 'Pending':
      return (
        <Label variant='ghost' color='warning'>
          {status}
        </Label>
      );
    default:
      return (
        <Label variant='ghost' color='default'>
          {status}
        </Label>
      );
  }
}

export function generateColumns(
  onClickEdit: (id: number, record: ITenant) => void,
  onClickDelete: (id: number) => void,
  theme: Theme
): ColumnType[] {
  return [
    {
      title: 'Nama Tenant',
      selector: 'first_name',
      render: (text, record: ITenant) => {
        const avatar = createTextAvatar(text);

        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ backgroundColor: avatar.color }}>{avatar.name}</Avatar>
              <Box sx={{ ml: 1 }}>
                <Link href={`#`} color={theme.palette.text.primary}>
                  <Typography variant='subtitle1'>{`${record.first_name} ${record.last_name}`}</Typography>
                </Link>
                <Link href={`/unit/${record.unit_id}`} color={theme.palette.grey[600]}>
                  <Typography variant='subtitle2'>{record.unit.name}</Typography>
                </Link>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      title: 'Status Tenant',
      selector: 'resident_status',
      flex: 1,
      render: (text) => createStatusLabel(text),
    },
    {
      title: 'No. Telp',
      selector: 'phone_number',
      render: (_text, record: ITenant) => {
        return <Typography variant='body2'>+{record.phones.length > 0 ? record.phones[0].number : '-'}</Typography>;
      },
    },
    {
      title: 'Periode Huni',
      selector: 'check_in',
      flex: 1,
      render: (text, record: ITenant) => {
        return (
          <>
            <Chip variant='outlined' color='primary' label={fDate(text)} />
            {' - '}
            <Chip
              variant='outlined'
              color='primary'
              label={record.check_out ? fDate(record.check_out.toString()) : 'Sekarang'}
            />
          </>
        );
      },
    },
    {
      title: '',
      selector: 'action',
      align: 'right',
      render: (_text, record: ITenant) => {
        return <ActionCellButton options={optionActionCell(record, onClickEdit, onClickDelete)} />;
      },
    },
  ] as ColumnType[];
}
