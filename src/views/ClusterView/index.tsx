import Add from "@mui/icons-material/Add";
import {
  Suspense,
  useMemo,
  useState,
  ReactElement,
  useContext
} from "react";

import useConfirmation from "../../hooks/useConfirmation";
import useForm from '../../hooks/useForm';

import { SelectOptionType, ICluster } from '../../types';

// import ActionButton from "../../components/buttons/ActionButton";
import { MyAnimatedButtonProps } from "../../components/buttons/AnimatedButton";
import { AlertContext } from "../../provider/AlertProvider";

import { AutocompleteInputChangeReason } from "@mui/material/Autocomplete";
import dynamic from "next/dynamic";

import useCluster from './hook/useCluster';
import { TabItem } from '@components/TabBar';


const ActionButton = dynamic(() => import("../../components/buttons/ActionButton"), {
  ssr: false
});

const FormCluster = dynamic(() => import("../../components/dialog/FormKlaster"), {
  ssr: false,
  suspense: true
});
const Section = dynamic(() => import('../../components/views/Section'), {
  ssr: false,
  suspense: true
});
const CardTable = dynamic(() => import('../../components/cards/CardTable'), {
  ssr: false,
  suspense: true
});
const TableData = dynamic(() => import('../../components/tables/TableCluster'), {
  ssr: false,
  suspense: true
});
const Confirmation = dynamic(() => import("../../components/dialog/Confirmation"), {
  ssr: false,
  suspense: true
});


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

const ClusterView = (): ReactElement => {

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

  const {
    clusters,
    insert,
    remove,
    update,
    dataLoading,
    dataError,
    dataReady,
    isValidating,
    reload,
    dataMeta
  } = useCluster();

  const totalData = dataMeta?.itemsTotal || clusters.length

  // other hooks
  const tabs = useMemo((): TabItem[] => [{
    label: "",
    text: "Semua",
    color: "default"
  }], []);


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

  const handleSelectChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: SelectOptionType | null,
    name: string
  ) => {
    setForm(name, newValue);
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

  const handleClickDeleteRow = (id: number) => {
    deleteConfirmationHandler.open()
    deleteConfirmationHandler.setState(id);

  }

  const handleConfirmDelete = () => {
    deleteConfirmationHandler.confirm().then(id => remove(id))
  }

  return (
    <>
      <Suspense>
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
            onReload={reload}
          >
            <TableData total={totalData} ready={dataReady} data={clusters} loading={dataLoading || isValidating} onClickEdit={handleClickEditRow} onClickDelete={handleClickDeleteRow} />
          </CardTable>
        </Section>
      </Suspense>

      <Suspense>
        <FormCluster
          edit={isEdit}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
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
    </>
  );
};

export default ClusterView;
