import Add from '@mui/icons-material/Add';
import { useMemo, useState, ReactElement, useContext, useEffect, Suspense } from 'react';

import useConfirmation from '../../hooks/useConfirmation';
import useForm from '../../hooks/useForm';
import { SelectOptionType, IUnit } from '../../types';
import { MyAnimatedButtonProps } from '../../components/buttons/AnimatedButton';
import { AlertContext } from '../../provider/AlertProvider';
import useUnit from './hook/useUnit';
import { ICreateUnitPayload } from '../../service/unit';
import dynamic from 'next/dynamic';
import { TabItem } from '@components/TabBar';

const ActionButton = dynamic(() => import('../../components/buttons/ActionButton'), {
  ssr: false,
});

const FormDialog = dynamic(() => import('../../components/dialog/FormUnit'), {
  ssr: false,
  suspense: true,
});
const Section = dynamic(() => import('../../components/views/Section'), {
  ssr: false,
  suspense: true,
});
const CardTable = dynamic(() => import('../../components/cards/CardTable'), {
  ssr: false,
  suspense: true,
});
const TableData = dynamic(() => import('../../components/tables/TableUnit'), {
  ssr: false,
  suspense: true,
});
const Confirmation = dynamic(() => import('../../components/dialog/Confirmation'), {
  ssr: false,
  suspense: true,
});

interface IFormSelectable {
  label: string;
  value: number;
}

interface IForm {
  id: number;
  name: string;
  totalArea: string;
  electricalCapacity: string;
  property: IFormSelectable;
  cluster: IFormSelectable;
  type: IFormSelectable;
  invoices: number[];
  bastDocs: string[];
  bastDate: number;
}

const initialForm: IForm = {
  id: 0,
  name: '',
  totalArea: '',
  electricalCapacity: '',
  property: {
    label: '',
    value: 0,
  },
  cluster: {
    label: '',
    value: 0,
  },
  type: {
    label: '',
    value: 0,
  },
  invoices: [],
  bastDocs: [],
  bastDate: 0,
};

const UnitView = (): ReactElement => {
  // contexts
  const { setAlert } = useContext(AlertContext);

  // states
  const [tabIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [visibility, setVisibility] = useState(false);

  // custom hooks
  const [form, setForm, resetForm, setFormBulk] = useForm<IForm>(initialForm);
  // console.log("form ==>", form)

  const {
    content: deleteConfirmation,
    handler: deleteConfirmationHandler,
    visibility: deleteConfirmationVisibility,
  } = useConfirmation<number>(
    {
      title: 'Konfirmasi Hapus',
      description: 'Apakah kamu yakin ingin menghapus item ini?',
      cancelText: 'Kembali',
      confirmText: 'Ya',
    },
    0
  );

  const { units, insert, remove, update, dataLoading, dataError, dataReady, isValidating, reload } = useUnit();

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


  const handleSelectChange = (name: string, value: any) => {
    setForm(name, value);

    if (name === 'property' && form.property && String(form.property.value) !== String(value?.value)) {
      setForm('cluster', null);
    }
  };

  const handleSubmit = () => {
    // it should check if the form is empty
    if (form.name === '' || Object.values(form.property).every((dt) => dt === '')) {
      setAlert({
        message: {
          severity: 'warning',
          content: 'Form tidak boleh kosong!',
        },
      });
      return;
    }

    const payload: ICreateUnitPayload = {
      name: form.name,
      total_area: Number(form.totalArea),
      electrical_capacity: Number(form.electricalCapacity),
      property_id: form.property.value,
      property_cluster_id: form.cluster.value,
      property_unit_type_id: form.type.value,
      template_invoice_id: form.invoices,
      bast_date: form.bastDate,
      bast_docs: form.bastDocs,
    };

    (isEdit ? update(form.id, payload) : insert(payload)).then(() => {
      setVisibility(false);
      resetForm();
    });
  };

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: 'Unit Baru',
      onClick: (): void => setVisibility(true),
      color: 'info',
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
  };

  const handleClickEditRow = (id: number, record: IUnit) => {
    setVisibility(true);
    setFormBulk({
      id: record.id,
      name: record.name,
      totalArea: String(record.total_area),
      electricalCapacity: String(record.electrical_capacity),
      type: {
        label: String(record.property_unit_type_id),
        value: record.property_unit_type_id,
      },
      property: {
        label: String(record.property_id),
        value: record.property_id,
      },
      cluster: {
        label: String(record.property_cluster_id),
        value: record.property_cluster_id,
      },
      bastDate: 0,
      bastDocs: [],
      invoices: [],
    });
  };

  const handleClickDeleteRow = (id: number) => {
    deleteConfirmationHandler.open();
    deleteConfirmationHandler.setState(id);
  };

  const handleConfirmDelete = () => {
    deleteConfirmationHandler.confirm().then((id) => remove(id));
  };

  useEffect(() => {
    if (form?.cluster?.value && !form.property.value) {
      setForm('cluster', null);
    }
  }, [form?.property?.value, form?.cluster?.value, setForm]);

  return (
    <>
      <Suspense>
        <Section
          title='Unit'
          description='Kelola Unit klaster properti'
          stackProps={{ mt: 12 }}
          actionButton={<ActionButton buttons={actionButton} />}
        >
          <CardTable
            searchPlaceholder='Cari Unit'
            searchValue={search}
            onChangeSearch={handleChangeSearch}
            tabs={tabs}
            tabIndex={tabIndex}
            withTabs
            searchField
            onReload={reload}
            error={Boolean(dataError)}
          >
            <TableData
              ready={dataReady}
              data={units}
              loading={dataLoading || isValidating}
              onClickEdit={handleClickEditRow}
              onClickDelete={handleClickDeleteRow}
            />
          </CardTable>
        </Section>
      </Suspense>

      <Suspense>
        <FormDialog
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

export default UnitView;
