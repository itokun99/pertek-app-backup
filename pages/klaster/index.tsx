import Add from "@mui/icons-material/Add";

import {
  Box,
  Card,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Suspense,
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactElement,
} from "react";
import useSWR from "swr";

import ActionButton from "../../src/components/buttons/ActionButton";
import AnimatedButton, { MyAnimatedButtonProps } from "../../src/components/buttons/AnimatedButton";
import { ErrorComponent } from "../../src/components/error/ErrorComponent";
import { TableLoader } from "../../src/components/loader/TableLoader";
import { TabBar } from "../../src/components/TabBar";
import { UploaderTable } from "../../src/components/tables/TableUploader";
import { doFetch } from "../../src/lib/dataFetcher";
import { AlertContext } from "../../src/provider/AlertProvider";
import { NetworkContext } from "../../src/provider/NetworkProvider";
import ProtectedPage from "../../src/template/ProtectedPage";

const Section = dynamic(() => import("../../src/components/views/Section"), {
  ssr: false,
  suspense: true,
});

const CardTable = dynamic(() => import("../../src/components/cards/CardTable"), {
  ssr: false,
});
const TableData = dynamic(() => import("../../src/components/tables/TableCluster"), {
  ssr: false,
});

const ClusterIndex = (): ReactElement => {
  const theme = useTheme();

  const [tabIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const tabs = useMemo(() => ["Semua"], []);

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: "Kluster Baru",
      onClick: (): void => {},
      color: "info",
      startIcon: <Add />,
    },
  ];

  // todo: make this filter search as a reusable component
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data } = useSWR("/api/klaster");

  console.info(data);

  return (
    <Suspense fallback={<div>Loading</div>}>
      <Section
        title="Klaster"
        description="Kelola kluster properti"
        stackProps={{ mt: 12 }}
        actionButton={<ActionButton buttons={actionButton} />}
      >
        <CardTable
          searchPlaceholder="Cari klaster"
          searchValue={search}
          onChangeSearch={handleChangeSearch}
          theme={theme}
          tabs={tabs}
          tabIndex={tabIndex}
          withTabs
          searchField
        >
          <TableData data={data?.items || []} loading={!data} />
        </CardTable>
      </Section>
    </Suspense>
  );
};

ClusterIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ClusterIndex;
