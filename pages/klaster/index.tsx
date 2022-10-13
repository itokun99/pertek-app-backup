import Add from "@mui/icons-material/Add";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Suspense,
  useMemo,
  useState,
  ReactElement,
  useContext
} from "react";
import useSWR from "swr";

import useConfirmation from "../../src/hooks/useConfirmation";
import useForm from '../../src/hooks/useForm';

import { SelectOptionType } from '../../src/types';

import ActionButton from "../../src/components/buttons/ActionButton";
import { MyAnimatedButtonProps } from "../../src/components/buttons/AnimatedButton";
import FormCluster from "../../src/components/dialog/FormKlaster";
import { ErrorComponent } from "../../src/components/error/ErrorComponent";
import { TableLoader } from "../../src/components/loader/TableLoader";
import { TabBar } from "../../src/components/TabBar";
import { UploaderTable } from "../../src/components/tables/TableUploader";
import { doFetch } from "../../src/lib/dataFetcher";
import { AlertContext } from "../../src/provider/AlertProvider";
import { fetchData } from "../../src/lib/dataFetcher";
import { NetworkContext } from "../../src/provider/NetworkProvider";
import ProtectedPage from "../../src/template/ProtectedPage";

import useCluster from '../../src/hooks/useCluster';

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

const Confirmation = dynamic(() => import("../../src/components/dialog/Confirmation"), {
  ssr: false,
  suspense: true
})


interface IFormProperty {
  label: string;
  value: string;
}
interface IForm {
  id: number;
  name: string;
  description: string;
  property: IFormProperty
}

const initialForm: IForm = {
  id: 0,
  name: "",
  description: "",
  property: {
    label: "",
    value: ""
  }
}

const ClusterIndex = (): ReactElement => {

  // contexts
  const { setAlert } = useContext(AlertContext);

  // states
  const [tabIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [visibility, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // custom hooks
  const [form, setForm] = useForm<IForm>(initialForm);
  const [confirmation, confirmationVisibility, { open, close, confirm, cancel }] = useConfirmation({
    title: 'Konfirmasi Hapus',
    description: 'Apakah kamu yakin ingin menghapus item ini?',
    cancelText: 'Kembali',
    confirmText: 'Ya'
  });

  const { clusters, insert, remove, update, dataLoading, dataError } = useCluster();

  // other hooks
  const tabs = useMemo(() => ["Semua"], []);


  // variables
  const isEdit = Boolean(form.id);


  // handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(value, name);
  };

  const handleSelectProperty = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: SelectOptionType | null
  ) => {
    setForm(newValue, 'property');
  };

  console.log("form ===>", form)

  const handleSubmit = async () => {
    setIsLoading(true);
    // it should check if the form is empty
    if (form.name === "" || Object.values(form.property).every((dt) => dt === "")) {
      setAlert({
        message: {
          severity: "warning",
          content: "Form tidak boleh kosong!",
        },
      });
      setIsLoading(false);
      return;
    }

    const payload = {
      name: form.name,
      property_id: form.property.value,
      description: form.description,
    };


    const [data, error] = isEdit ? await update(form.id, payload) : await insert(payload);

    if (error) {
      setAlert({
        message: {
          severity: "error",
          content: error.message,
        },
      });
      return;
    }
    setIsLoading(false)
  };

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: "Kluster Baru",
      onClick: (): void => setVisibility(true),
      color: "info",
      startIcon: <Add />,
    },
  ];

  // todo: make this filter search as a reusable component
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClose = (): void => {
    setVisibility(false);
  }

  const handleClickEditRow = (id: string, record: object) => {
    // open();
    console.log("record ==>", record)
  }

  const handleClickDeleteRow = (id: string, record: object) => {
    open();
    // console.log("record ==>", record)
    // setForm({
    //   id: record?.id || 0,
    //   name: record?.name || "",
    //   description: record?.description || "",
    //   property: {
    //     label: record?.property?.name,
    //     value: record?.property?.id
    //   }
    // })
  }

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
          tabs={tabs}
          tabIndex={tabIndex}
          withTabs
          searchField
        >
          <TableData data={clusters} loading={dataLoading} onClickEdit={handleClickEditRow} onClickDelete={handleClickDeleteRow} />
        </CardTable>
      </Section>
      <Suspense>
        <FormCluster
          onInputChange={handleInputChange}
          onSelectProperty={handleSelectProperty}
          onSubmit={handleSubmit}
          visible={visibility}
          onClose={handleClose}
          form={form}
        />
      </Suspense>
      <Suspense>
        <Confirmation
          open={confirmationVisibility}
          title={confirmation.title}
          description={confirmation.description}
          cancelText={confirmation.cancelText}
          confirmText={confirmation.confirmText}
          onClose={close}
          onCancel={cancel}
          onConfirm={confirm}
        />
      </Suspense>
    </Suspense>
  );
};

ClusterIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ClusterIndex;
