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

import { SelectOptionType, ICluster } from '../../src/types';

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

import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";


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
  value: number;
}
interface IForm {
  id: number;
  name: string;
  description: string;
  property: IFormProperty,
  propertyInput: string;
}

const initialForm: IForm = {
  id: 0,
  name: "",
  description: "",
  propertyInput: "",
  property: {
    label: "",
    value: 0
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
  const [form, setForm, resetForm, setFormBulk] = useForm<IForm>(initialForm);
  const {
    content: deleteConfirmation,
    handler: deleteConfirmationHandler,
    visibility:
    deleteConfirmationVisibility
  } = useConfirmation<number>({
    title: 'Konfirmasi Hapus',
    description: 'Apakah kamu yakin ingin menghapus item ini?',
    cancelText: 'Kembali',
    confirmText: 'Ya'
  }, 0);

  const { clusters, insert, remove, update, dataLoading, dataError, dataReady, isValidating } = useCluster();

  // other hooks
  const tabs = useMemo(() => ["Semua"], []);


  // variables
  const isEdit = Boolean(form.id);


  // handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(name, value);
  };


  const handleInputSelectChange = (_event: React.SyntheticEvent, value: string, _reason: AutocompleteInputChangeReason) => {
    setForm('propertyInput', value);
  }

  const handleSelectProperty = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: SelectOptionType | null
  ) => {
    setForm('property', newValue);
  };

  const handleSubmit = () => {
    // it should check if the form is empty
    if (form.name === "" || Object.values(form.property).every((dt) => dt === "")) {
      setAlert({
        message: {
          severity: "warning",
          content: "Form tidak boleh kosong!",
        },
      });
      return;
    }

    const payload = {
      name: form.name,
      property_id: form.property.value,
      description: form.description,
    };


    (isEdit ? update(form.id, payload) : insert(payload)).then(() => {
      setVisibility(false);
      resetForm();
    })
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
    resetForm();
  }

  const handleClickEditRow = (id: number, record: ICluster) => {
    // open();

    console.log("record", record);

    setFormBulk({
      id: id,
      name: record.name,
      description: "",
      propertyInput: record.property.name,
      property: {
        label: record.property.name,
        value: record.property.id
      }
    })

    setVisibility(true);
  }

  console.log("FORM===>", form)

  const handleClickDeleteRow = (id: number) => {
    deleteConfirmationHandler.open()
    deleteConfirmationHandler.setState(id);

  }

  const handleConfirmDelete = () => {
    deleteConfirmationHandler.confirm().then(id => remove(id))
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
          error={Boolean(dataError)}
        >
          <TableData ready={dataReady} data={clusters} loading={dataLoading || isValidating} onClickEdit={handleClickEditRow} onClickDelete={handleClickDeleteRow} />
        </CardTable>
      </Section>
      <Suspense>
        <FormCluster
          edit={isEdit}
          onInputChange={handleInputChange}
          onInputSelectChange={handleInputSelectChange}
          onSelectProperty={handleSelectProperty}
          onSubmit={handleSubmit}
          visible={visibility}
          onClose={handleClose}
          form={form}
        />
      </Suspense>
      <Suspense>
        <Confirmation
          open={deleteConfirmationVisibility}
          title={deleteConfirmation.title}
          description={deleteConfirmation.description}
          cancelText={deleteConfirmation.cancelText}
          confirmText={deleteConfirmation.confirmText}
          onClose={deleteConfirmationHandler.close}
          onCancel={deleteConfirmationHandler.cancel}
          onConfirm={handleConfirmDelete}
        />
      </Suspense>
    </Suspense>
  );
};

ClusterIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ClusterIndex;
