import ActionCellButton, { IActionCellButtonProperties } from '@components/buttons/ActionCellButton';
import { IBooking } from '@types';
import BaseTable from '../BaseTable';
import { ColumnType } from '../BaseTable/BaseTable.interface';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { fDate, fDateTime } from '@utils/formatTime';
import {
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  Popover,
  Stack,
  Step,
  StepButton,
  StepConnector,
  StepLabel,
  Stepper,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import Label from '@components/Label';
import { ReactElement, useCallback, useState } from 'react';
import {
  AccessTime,
  AccessTimeFilled,
  Block,
  Cancel,
  CheckCircle,
  GppGood,
  PlayCircle,
  RemoveCircle,
} from '@mui/icons-material';

export interface TableBookingProps {
  isLoading: boolean;
  data: IBooking[];
  totalData: number;
  onUpdateState: (id: number, state: string) => void;
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

function generateColumns(
  onEdit: (id: number, record: IBooking) => void,
  onDelete: (id: number) => void,
  onStateClick: (e: any, booking: IBooking) => void,
  theme: Theme
): ColumnType[] {
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
      render: (_text, record: IBooking) => (
        <Button sx={{ p: 0 }} onClick={(e) => onStateClick(e, record)}>
          {createBookingLabel(_text)}
        </Button>
      ),
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

export const TableBookingView = ({
  onEdit,
  onDelete,
  onUpdateState,
  data,
  isLoading,
  totalData,
}: TableBookingProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [booking, setBooking] = useState<IBooking | null>(null);

  const onStateClick = useCallback((e: any, booking: IBooking) => {
    setAnchorEl(e.currentTarget);
    setBooking(booking);
  }, []);

  return (
    <>
      <StatusPopover
        anchorEl={anchorEl}
        booking={booking}
        onClose={() => setAnchorEl(null)}
        onUpdateState={onUpdateState}
      />
      <BaseTable
        columns={generateColumns(onEdit, onDelete, onStateClick, theme)}
        field={data}
        loading={isLoading}
        withPagination
        total={totalData}
      />
    </>
  );
};

interface StatusPopoverProps {
  anchorEl: Element | null;
  booking: IBooking | null;
  onClose?: () => void;
  onUpdateState: (id: number, state: string) => void;
}

const StatusPopover = ({ anchorEl, booking, onClose, onUpdateState }: StatusPopoverProps) => {
  const theme = useTheme();

  const shouldBeDisabled = useCallback(
    (state: string, booking?: IBooking): { isTrue: boolean; isPositive: boolean } => {
      let isTrue = true;
      const isPositive = ['Requested', 'Ongoing', 'Done', 'Booked'].includes(booking?.status ?? '');

      if (booking?.status === 'Ongoing' && state === 'Done') {
        isTrue = false;
      }

      if (booking?.status === 'Requested' && state !== 'Requested') {
        isTrue = false;
      }

      if (booking?.status === 'Booked' && state !== 'Requested') {
        isTrue = false;
      }

      return { isTrue, isPositive };
    },
    []
  );
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      onClose={onClose}
      open={Boolean(anchorEl)}
      disableAutoFocus={true}
      disableEnforceFocus={true}
    >
      <Stack sx={{ px: 2, py: 3 }} alignItems='start' justifyContent='start'>
        <Stepper nonLinear activeStep={0} orientation='horizontal' alternativeLabel connector={<StepConnector />}>
          {[
            { label: 'Requested', icon: AccessTimeFilled },
            { label: 'Booked', icon: GppGood },
            { label: 'Ongoing', icon: PlayCircle },
            { label: 'No Show', icon: RemoveCircle },
            { label: 'Canceled', icon: Cancel },
            { label: 'Done', icon: CheckCircle },
          ].map((state) => {
            const shouldDisabled = shouldBeDisabled(state.label, booking!);
            return (
              <Step
                key={state.label}
                style={{
                  color:
                    state.label === booking?.status
                      ? shouldDisabled.isPositive
                        ? theme.palette.success.main
                        : theme.palette.error.main
                      : shouldDisabled.isTrue
                      ? theme.palette.grey[400]
                      : theme.palette.success.light,
                }}
                active={booking?.status === state.label}
              >
                <StepButton
                  disableRipple
                  disabled={shouldDisabled.isTrue}
                  onClick={() => {
                    onUpdateState(booking!.id, state.label);
                    onClose?.();
                  }}
                >
                  <StepLabel StepIconComponent={state.icon}>{state.label}</StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Stack>
    </Popover>
  );
};
