import BaseTable from '../BaseTable';
import { generateColumns } from './index.enum';
import { IContactStaffEntities } from '@general-types';
import { useTheme } from '@mui/material';

export interface ITableStaffProperties {
  data: Array<IContactStaffEntities>;
  loading: boolean;
  ready: boolean;
  total: number;
  onClickEdit: (id: number, record: IContactStaffEntities) => void;
  onClickDelete: (id: number) => void;
}

const StaffTable = ({ data, total, loading, onClickEdit, onClickDelete }: ITableStaffProperties) => {
  const theme = useTheme();

  return (
    <BaseTable
      columns={generateColumns(onClickEdit, onClickDelete, theme)}
      field={data}
      loading={loading}
      withPagination
      total={total}
    />
  );
};

export default StaffTable;
