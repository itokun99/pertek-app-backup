import Add from '@mui/icons-material/Add';
import { Suspense, useMemo, useState, ReactElement, useContext, useEffect } from 'react';

import useConfirmation from '../../hooks/useConfirmation';
import useForm from '../../hooks/useForm';
import { SelectOptionType, IUnitType } from '../../types';
import { MyAnimatedButtonProps } from '../../components/buttons/AnimatedButton';
// import FormDialog from "../../components/dialog/FormUnitType";
import { AlertContext } from '../../provider/AlertProvider';
import useUnitType from './hook/useUnitType';
import dynamic from 'next/dynamic';

const ActionButton = dynamic(() => import('../../components/buttons/ActionButton'), {
  ssr: false,
});

const FormDialog = dynamic(() => import('../../components/dialog/FormUnitType'), {
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
const TableData = dynamic(() => import('../../components/tables/TableUnitType'), {
  ssr: false,
  suspense: true,
});
const Confirmation = dynamic(() => import('../../components/dialog/Confirmation'), {
  ssr: false,
  suspense: true,
});

import { ICreateUnitTypePayload } from '../../service/tipe-unit';

interface IFormSelectable {
  label: string;
  value: number;
}

interface IForm {
  id: number;
  name: string;
  description: string;
  property: IFormSelectable;
}

const initialForm: IForm = {
  id: 0,
  name: '',
  description: '',
  property: {
    label: '',
    value: 0,
  },
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

  const { unitTypes, insert, remove, update, dataLoading, dataError, dataReady, isValidating, reload } = useUnitType();

  // other hooks
  const tabs = useMemo(() => ['Semua'], []);

  // variables
  const isEdit = Boolean(form.id);

  // handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(name, value);
  };

  const handleSelectChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: SelectOptionType | null,
    name: string
  ) => {
    setForm(name, newValue);

    if (name === 'property' && form.property && String(form.property.value) !== String(newValue?.value)) {
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

    const payload: ICreateUnitTypePayload = {
      type_name: form.name,
      description: form.description,
      property_id: form.property.value,
    };

    (isEdit ? update(form.id, payload) : insert(payload)).then(() => {
      setVisibility(false);
      resetForm();
    });
  };

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: 'Tipe Unit Baru',
      onClick: (): void => setVisibility(true),
      color: 'info',
      startIcon: <Add />,
    },
  ];

  const actionButtonTypeUnit: Array<MyAnimatedButtonProps> = [
    {
      title: 'Tipe Unit Baru',
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

  const handleClickEditRow = (id: number, record: IUnitType) => {
    setVisibility(true);
  };

  const handleClickDeleteRow = (id: number) => {
    deleteConfirmationHandler.open();
    deleteConfirmationHandler.setState(id);
  };

  const handleConfirmDelete = () => {
    deleteConfirmationHandler.confirm().then((id) => remove(id));
  };

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Section
          title='Tipe Unit'
          description='Kelola tipe unit yang tersedia'
          stackProps={{ mt: 12 }}
          actionButton={<ActionButton buttons={actionButton} />}
        >
          <CardTable
            searchPlaceholder='Cari Tipe Unit'
            searchValue={search}
            onChangeSearch={handleChangeSearch}
            tabs={tabs}
            tabIndex={tabIndex}
            withTabs
            searchField
            error={Boolean(dataError)}
            onReload={reload}
          >
            <TableData
              ready={dataReady}
              data={unitTypes}
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
