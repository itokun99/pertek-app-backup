import { PropsWithChildren, memo } from 'react';
import { generateColumns } from './index.enum';
import { TableLoader } from '../../loader/TableLoader';
import { IContact } from '@general-types';
import BaseTable from '../BaseTable';

export interface ITableContactProps {
  data: Array<IContact>;
  loading: boolean;
  ready: boolean;
  total: number;
  onClickEdit: (id: number, record: IContact) => void;
  onClickDelete: (id: number) => void;
}

const TableContact = ({
  data,
  ready,
  total,
  loading = false,
  onClickEdit,
  onClickDelete,
}: PropsWithChildren & ITableContactProps) => {
  if (!ready) {
    return <TableLoader />;
  }

  return (
    <>
      <BaseTable
        columns={generateColumns(onClickEdit, onClickDelete)}
        field={data}
        loading={loading}
        withPagination
        total={total}
      />
    </>
  );
};

export default memo(TableContact);
