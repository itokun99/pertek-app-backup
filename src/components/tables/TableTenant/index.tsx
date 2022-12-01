import BaseTable from "../BaseTable";
import { generateColumns } from "./index.enum";
import { ITenant } from "@general-types";
import { useTheme } from "@mui/material";

export interface ITableTenantProps {
  data: Array<ITenant>;
  loading: boolean;
  ready: boolean;
  total: number;
  onClickEdit: (id: number, record: ITenant) => void;
  onClickDelete: (id: number) => void;
  onClickDetail: (id: number, record: ITenant) => void;
}

const TenantTable = ({
  data,
  total,
  loading,
  onClickEdit,
  onClickDelete,
  onClickDetail,
}: ITableTenantProps) => {
  const theme = useTheme();

  return (
    <BaseTable
      columns={generateColumns(onClickEdit, onClickDelete, onClickDetail, theme)}
      field={data}
      loading={loading}
      withPagination
      total={total}
    />
  );
};

export default TenantTable;
