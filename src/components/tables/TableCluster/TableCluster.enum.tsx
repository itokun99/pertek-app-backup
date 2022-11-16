import ActionCellButton, { IActionCellButtonProperties } from '../../buttons/ActionCellButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ICluster } from '../../../types';
import { ColumnType } from '../BaseTable/BaseTable.interface';

const optionActionCell = (
  record: ICluster,
  onClickEdit: (id: number, record: ICluster) => void,
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

export function generateColumns(
  onClickEdit: (id: number, record: ICluster) => void,
  onClickDelete: (id: number) => void
): ColumnType[] {
  return [
    {
      title: 'Nama Klaster',
      selector: 'name',
    },
    {
      title: 'Properti',
      selector: 'property_id',
      render: (_text, record: ICluster) => {
        return record ? record.name : '-';
      },
    },
    {
      title: '',
      selector: 'action',
      align: 'right',
      render: (_text, record: ICluster) => {
        return <ActionCellButton options={optionActionCell(record, onClickEdit, onClickDelete)} />;
      },
    },
  ] as ColumnType[];
}
