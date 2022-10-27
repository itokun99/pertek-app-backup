import ActionCellButton, { IActionCellButtonProperties } from '@components/buttons/ActionCellButton';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IFacility } from '@types';
import BaseTable from '../BaseTable';
import { ColumnType } from '../BaseTable/BaseTable.interface';

export interface TableFacilityProps {
  facilities: IFacility[];
  onEdit: (id: number, facility: IFacility) => void;
  onDelete: (id: number) => void;
}

const optionActionCell = (
  record: IFacility,
  onEdit: (id: number, facility: IFacility) => void,
  onDelete: (id: number) => void
) => {
  return [
    {
      label: 'Edit',
      icon: <ModeEditOutlineOutlinedIcon />,
      onClick: () => onEdit(record.id, record),
    },
    {
      label: 'Delete',
      icon: <DeleteOutlineOutlinedIcon />,
      color: 'error',
      onClick: () => onDelete(record.id),
    },
  ] as IActionCellButtonProperties['options'];
};

const generateColumns = (onEdit: (id: number, record: IFacility) => void, onDelete: (id: number) => void) => {
  return [
    {
      title: 'Nama',
      selector: '',
      render: (_text, record: IFacility) => record.name,
    },
    {
      title: 'Alamat',
      selector: 'address',
      render: (_text, record: IFacility) => record.description,
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

const TableFacility = ({ facilities, onDelete, onEdit }: TableFacilityProps) => {
  return <BaseTable columns={generateColumns(onEdit, onDelete)} field={facilities}></BaseTable>;
};

export default TableFacility;
