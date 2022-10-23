import Add from '@mui/icons-material/Add';
import { useMemo, useState, ReactElement, useContext, useEffect, Suspense } from 'react';

import useConfirmation from '@hooks/useConfirmation';
import useForm from '@hooks/useForm';
import { SelectOptionType, IContact } from '@types';
import { MyAnimatedButtonProps } from '@components/buttons/AnimatedButton';
import { AlertContext } from '@provider/AlertProvider';
import useContact from './hook/useContact';
import { ICreateContactPayload } from '@service/contact';
import dynamic from 'next/dynamic';
import { TabItem } from '@components/TabBar';
import FormDialog, { IForm } from '@components/dialog/FormContact';
import { IMultipleInputItem } from '@components/input/MultipleInput';

const ActionButton = dynamic(() => import('@components/buttons/ActionButton'), {
  ssr: false,
});

const Section = dynamic(() => import('@components/views/Section'), {
  ssr: false,
  suspense: true,
});
const CardTable = dynamic(() => import('@components/cards/CardTable'), {
  ssr: false,
  suspense: true,
});
const TableData = dynamic(() => import('@components/tables/TableContact'), {
  ssr: false,
  suspense: true,
});
const Confirmation = dynamic(() => import('@components/dialog/Confirmation'), {
  ssr: false,
  suspense: true,
});

const initialForm: IForm = {
  id: 0,
  firstName: "",
  lastName: "",
  identity: "",
  identityType: "",
  address: "",
  emails: [
    {
      value: "",
      checked: false,
    }
  ],
  phones: [
    {
      value: "",
      checked: false,
    }
  ]
};

const ContactView = (): ReactElement => {
  // contexts
  const { setAlert } = useContext(AlertContext);

  // states
  const [tabIndex, setTabIndex] = useState<string | number>("all");
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

  const { items, insert, remove, update, dataLoading, dataError, dataReady, isValidating, reload, dataMeta } = useContact();

  // other hooks
  const tabs = useMemo((): TabItem[] => [
    {
      label: "",
      text: "Semua",
      color: "default",
      value: "all"
    }
  ], []);

  // variables
  const isEdit = Boolean(form.id);


  // handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(name, value);
  };

  const handleSelectChange = (name: string, value: any) => {
    setForm(name, value);
  };

  const handleMultipleInputChange = (name: string, value: IMultipleInputItem[]) => {
    setForm(name, value);
  }

  const handleTabChange = (_e: React.SyntheticEvent<Element, Event>, value: number | string) => {
    setTabIndex(value);
  }

  const handleSubmit = () => {
    // it should check if the form is empty
    // if (form.name === '' || Object.values(form.property).every((dt) => dt === '')) {
    //   setAlert({
    //     message: {
    //       severity: 'warning',
    //       content: 'Form tidak boleh kosong!',
    //     },
    //   });
    //   return;
    // }

    const payload: ICreateContactPayload = {
      first_name: form.firstName,
      last_name: form.lastName,
      address: form.address,
      identity: form.identity,
      identity_type: form.identityType
    };

    (isEdit ? update(form.id, payload) : insert(payload)).then(() => {
      setVisibility(false);
      resetForm();
    });
  };

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: 'Kontak Baru',
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

  const handleClickEditRow = (id: number, record: IContact) => {
    setVisibility(true);
    // setFormBulk({

    // });
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
      <Suspense>
        <Section
          title='Kontak'
          description='management kelola kontak'
          stackProps={{ mt: 12 }}
          actionButton={<ActionButton buttons={actionButton} />}
        >
          <CardTable
            searchPlaceholder='Cari Kontak'
            searchValue={search}
            onChangeSearch={handleChangeSearch}
            tabs={tabs}
            tabIndex={tabIndex}
            withTabs
            searchField
            onReload={reload}
            onChangeTab={handleTabChange}
            error={Boolean(dataError)}
          >
            <TableData
              ready={dataReady}
              data={items}
              total={dataMeta?.itemsTotal || items.length}
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
          onMultipleInputChange={handleMultipleInputChange}
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

export default ContactView;
