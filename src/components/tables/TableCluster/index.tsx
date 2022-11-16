import { memo, PropsWithChildren } from 'react';
import { ICluster } from '../../../types';
import { TableLoader } from '../../loader/TableLoader';
import BaseTable from '../BaseTable';
import { generateColumns } from './TableCluster.enum';

export interface ITableClusterProps {
  data: Array<ICluster>;
  loading: boolean;
  ready: boolean;
  total: number;
  onClickEdit: (id: number, record: ICluster) => void;
  onClickDelete: (id: number) => void;
}

const TableCluster = ({
  data,
  ready,
  total,
  loading = false,
  onClickEdit,
  onClickDelete,
}: PropsWithChildren & ITableClusterProps) => {
  if (!ready) {
    return <TableLoader />;
  }

  return (
    <BaseTable
      columns={generateColumns(onClickEdit, onClickDelete)}
      field={data}
      loading={loading}
      withPagination
      total={total}
    />
  );
};

export default memo(TableCluster);
