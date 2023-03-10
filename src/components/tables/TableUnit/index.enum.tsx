import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Link from '@mui/material/Link';
import { IUnit } from '../../../types';
import ActionCellButton, { IActionCellButtonProperties } from '../../buttons/ActionCellButton';
import { ColumnType } from '../BaseTable/BaseTable.interface';

const optionActionCell = (
  record: IUnit,
  onClickEdit: (id: number, record: IUnit) => void,
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
  onClickEdit: (id: number, record: IUnit) => void,
  onClickDelete: (id: number) => void
): ColumnType[] {
  return [
    {
      title: 'Nama Unit',
      selector: 'name',
    },
    {
      title: 'Total Area',
      selector: 'total_area',
    },
    {
      title: 'Kapasitas Listrik',
      selector: 'electrical_capacity',
    },
    {
      title: 'Dokumen Serah Terima',
      selector: 'bast_docs',
      render: (_text, record: IUnit) => {
        const { bast_docs } = record;
        if (!bast_docs || bast_docs.length === 0) {
          return '-';
        }

        return (
          <>
            {bast_docs.map((v, i) => {
              return <Link key={i}>{v}</Link>;
            })}
          </>
        );
      },
    },
    {
      title: 'Tanggal Serah Terima',
      selector: 'bast_date',

      render: (_text, record: IUnit) => {
        const { bast_date } = record;
        return bast_date ? bast_date : '-';
      },
    },
    {
      title: '',
      selector: 'action',
      align: 'right',
      render: (_text, record: IUnit) => {
        return <ActionCellButton options={optionActionCell(record, onClickEdit, onClickDelete)} />;
      },
    },
  ] as ColumnType[];
}
