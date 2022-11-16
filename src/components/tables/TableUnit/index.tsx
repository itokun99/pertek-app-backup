import { memo, PropsWithChildren } from 'react';
import { IUnit } from '../../../types';
import { TableLoader } from '../../loader/TableLoader';
import BaseTable from '../BaseTable';
import { generateColumns } from './index.enum';

export interface ITableUnitProps {
  data: Array<IUnit>;
  loading: boolean;
  ready: boolean;
  onClickEdit: (id: number, record: IUnit) => void;
  onClickDelete: (id: number) => void;
}

const TableCluster = ({
  data,
  ready,
  loading = false,
  onClickEdit,
  onClickDelete,
}: PropsWithChildren & ITableUnitProps) => {
  if (!ready) {
    return <TableLoader />;
  }

  return (
    <>
      <BaseTable columns={generateColumns(onClickEdit, onClickDelete)} field={data} loading={loading} withPagination />
    </>
  );
};

export default memo(TableCluster);
