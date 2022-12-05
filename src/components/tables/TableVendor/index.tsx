import BaseTable from "../BaseTable";
import { generateColumns } from "./index.enum";
import { IVendorEntities } from "@general-types";
import { useTheme } from "@mui/material";

export interface ITableVendorProperties {
  data: Array<IVendorEntities>;
  loading: boolean;
  ready: boolean;
  total: number;
  onClickEdit: (id: number, record: IVendorEntities) => void;
  onClickDelete: (id: number) => void;
  onClickDetail: (id: number) => void;
}

const VendorTable = ({
  data,
  total,
  loading,
  onClickEdit,
  onClickDelete,
  onClickDetail
}: ITableVendorProperties) => {
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

export default VendorTable;
