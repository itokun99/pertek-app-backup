import { ITenant } from '@general-types';
import ActionCellButton, { IActionCellButtonProperties } from "../../buttons/ActionCellButton";
import { ColumnType } from "../BaseTable/BaseTable.interface";
import { createTextAvatar } from '@utils/createAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Label from '../../Label';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { fDate } from '@utils/formatTime';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const optionActionCell = (
  record: ITenant,
  onClickEdit: (id: number, record: ITenant) => void,
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
  onClickEdit: (id: number, record: ITenant) => void,
  onClickDelete: (id: number) => void
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
                <Typography variant='subtitle1'>
                  <Link href={`#`}>{`${record.first_name} ${record.last_name}`}</Link>
                </Typography>
                <Typography variant='subtitle2'>
                  <Link href={`/unit/${record.unit_id}`}>
                    {record.unit.name}
                  </Link>
                </Typography>
              </Box>
            </Box>
          </>
        );
      },
    },
    {
      title: 'No. Telp',
      selector: 'phone_number',
      render: (_text, record: ITenant) => {
        return (
          <Typography variant='body2'>
            {record.phones.map((phone) => phone.number).join(', ')}
          </Typography>
        );
      },
    },
    {
      title: 'Mulai Huni',
      selector: 'check_in',
      flex: 1,
      render: (text) => fDate(text),
    },
    {
      title: 'Status Tenant',
      selector: 'resident_status',
      flex: 1,
      render: (text) => {
        return (
          <Label variant='ghost' color={text === 'verified' ? 'success' : 'default'} >
            {text}
          </Label>
        );
      },
    },
    {
      title: "",
      selector: "action",
      align: "right",
      render: (_text, record: ITenant) => {
        return <ActionCellButton options={optionActionCell(record, onClickEdit, onClickDelete)} />;
      },
    }
  ] as ColumnType[];
}