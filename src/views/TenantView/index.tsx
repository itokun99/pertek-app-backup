import Add from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { useMemo, useState, ReactElement, useContext, useEffect, Suspense } from 'react';

import useConfirmation from '@hooks/useConfirmation';
import useForm from '@hooks/useForm';
import { ITenant } from '@general-types';
import { MyAnimatedButtonProps } from '@components/buttons/AnimatedButton';
import { AlertContext } from '@provider/AlertProvider';
import useTenant from './hook/useTenant';
import dynamic from 'next/dynamic';
import { TabItem } from '@components/TabBar';
import FormDialog, { IForm, IFormError } from '@components/dialog/FormTenant';
import { IMultipleInputItem, validateMultipleInput } from '@components/input/MultipleInput';
import CloudDownload from '@mui/icons-material/CloudDownload';
import CloudUpload from '@mui/icons-material/CloudUpload';
import { ICreateTenantPayload } from '@service/tenant';
import Label from '@components/Label';

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
const TableData = dynamic(() => import('@components/tables/TableTenant'), {
  ssr: false,
  suspense: true,
});
const Confirmation = dynamic(() => import('@components/dialog/Confirmation'), {
  ssr: false,
  suspense: true,
});

const initialForm: IForm = {
  id: 0,
  contact: {
    label: '',
    value: '',
  },
  propertyUnit: {
    label: '',
    value: '',
  },
  checkIn: null,
  checkOut: null,
  familyStatus: '',
  parentTenancy: '',
  residentStatus: '',
};

const initialFormError: IFormError = {
  contact: '',
  checkIn: '',
  checkOut: '',
  familyStatus: '',
  propertyUnit: '',
  residentStatus: '',
  parentTenancy: '',
};

const TenantView = (): ReactElement => {
  // contexts
  const { setAlert } = useContext(AlertContext);

  const router = useRouter();

  // states
  const [tabIndex, setTabIndex] = useState<string | number>('');
  const [search, setSearch] = useState<string>('');
  const [visibility, setVisibility] = useState(false);

  // custom hooks
  const [form, setForm, resetForm, setFormBulk] = useForm<IForm>(initialForm);
  const [formError, setFormError, resetFormError, setFormErrorBulk] = useForm<IFormError>(initialFormError);

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

  const {
    items,
    insert,
    remove,
    update,
    inquiry,
    isLoading,
    isError,
    isReady,
    isValidating,
    reload,
    dataMeta,
    loadingForm,
    downloadTemplate,
    setLoadingForm,
  } = useTenant();

  // other hooks
  const tabs = useMemo(
    (): TabItem[] => [
      {
        label: '',
        text: 'Semua',
        color: 'default',
        value: '',
      },
      {
        label: '',
        text: 'Pending',
        color: 'default',
        value: 'pending',
      },
      {
        label: '',
        text: 'Verified',
        color: 'default',
        value: 'verified',
      },
      {
        label: '',
        text: 'Blocked',
        color: 'default',
        value: 'blocked',
      },
    ],
    []
  );

  // variables
  const isEdit = Boolean(form.id);

  // handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(name, value);

    if (formError[name as keyof typeof formError]) {
      setFormError(name, '');
    }
  };

  const handleSelectChange = (name: string, value: any) => {
    setForm(name, value);

    if (formError[name as keyof typeof formError]) {
      setFormError(name, '');
    }

    if (name === 'propertyUnit') {
      setForm('parentTenancy', '');
    }
  };

  const handleTabChange = (_e: React.SyntheticEvent<Element, Event>, value: number | string) => {
    setTabIndex(value);
    const { query } = router;
    const queryPamaramaters = { ...query };
    queryPamaramaters.status = (value as string) || '';

    // it should delete unnecessary params || todo: clear empty object
    Object.entries(queryPamaramaters).forEach(([queryKey]) => {
      if (!['status'].includes(queryKey)) {
        delete queryPamaramaters[queryKey];
      }
    });

    router.push({ query: { ...queryPamaramaters } }, undefined, { shallow: true });

    // router.push('/tenant', {
    //   query: {
    //     ...router.query,
    //     status: value
    //   },
    // }, { shallow: true });

    // console.log("value", value)
  };

  const validateForm = (form: IForm, formError: IFormError) => {
    const error = { ...formError };
    if (!form.contact || !form.contact.value) {
      error.contact = 'Kontak harus diisi';
    }

    if (!form.propertyUnit || !form.propertyUnit.value) {
      error.propertyUnit = 'Properti Unit harus diisi';
    }

    // if (!form.parentTenancy) {
    //   error.parentTenancy = 'Parent Tenant harus diisi';
    // }

    if (!form.residentStatus) {
      error.residentStatus = 'Resident Status harus diisi';
    }

    if (!form.familyStatus) {
      error.familyStatus = 'Family Status harus diisi';
    }

    if (!form.checkIn) {
      error.checkIn = 'Check In harus diisi';
    }

    if (!form.checkOut) {
      error.checkOut = 'Check Out harus diisi';
    }

    return error;
  };

  const handleSubmit = () => {
    // it should check if the form is empty

    console.log('FORM', form);

    const error = validateForm(form, formError);
    const isValid = Object.keys(error).every((key) => !error[key as keyof typeof formError]);

    if (!isValid) {
      // console.log("masuk sini12", error)
      setFormErrorBulk(error);
      return;
    } else {
      resetFormError();
    }

    const payload: ICreateTenantPayload = {
      contact_id: parseInt(form.contact.value),
      property_unit_id: parseInt(form.propertyUnit.value),
      check_in: form.checkIn,
      check_out: form.checkOut,
      family_status: form.familyStatus,
      parent_tenancy_id: parseInt(form.parentTenancy),
      resident_status: form.residentStatus,
    };

    setLoadingForm(true);
    (isEdit ? update(form.id, payload) : insert(payload))
      .then(() => {
        setVisibility(false);
        resetForm();
        setLoadingForm(false);
      })
      .catch((err) => {
        setLoadingForm(false);
        console.log('err', err);
      });
  };

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: 'Tenant Baru',
      onClick: (): void => setVisibility(true),
      color: 'info',
      startIcon: <Add />,
    },
    {
      title: 'Template',
      onClick: downloadTemplate,
      color: 'warning',
      startIcon: <CloudDownload />,
    },
    {
      title: 'Upload CSV',
      onClick: (): void => {},
      color: 'success',
      startIcon: <CloudUpload />,
    },
  ];

  // todo: make this filter search as a reusable component
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClose = (): void => {
    setVisibility(false);
    resetForm();
    resetFormError();
  };

  const handleClickEditRow = (id: number, _record: ITenant) => {
    setVisibility(true);

    setLoadingForm(true);
    inquiry(id)
      .then((data) => {
        if (data) {
          setFormBulk({
            contact: {
              label: `${data.contact.first_name} ${data.contact.last_name}`,
              value: String(data.contact.id),
            },
            checkIn: data.check_in,
            checkOut: data.check_out,
            id: data.id,
            familyStatus: data.family_status,
            parentTenancy: String(data.parent_tenancy_id),
            propertyUnit: {
              label: '',
              value: String(data.property_unit_id),
            },
            residentStatus: data.resident_status,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingForm(false);
      });
  };

  // TODO: have problem with api params
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
          title='Tenant'
          description='Kelola tenant properti Anda'
          stackProps={{ mt: 12 }}
          actionButton={<ActionButton buttons={actionButton} />}
        >
          <CardTable
            searchPlaceholder='Cari Tenant'
            searchValue={search}
            onChangeSearch={handleChangeSearch}
            tabs={tabs}
            tabIndex={tabIndex}
            withTabs
            searchField
            onReload={reload}
            onChangeTab={handleTabChange}
            error={Boolean(isError)}
          >
            <TableData
              ready={isReady}
              data={items}
              total={dataMeta?.itemsTotal || items.length}
              loading={isLoading || isValidating}
              onClickEdit={handleClickEditRow}
              onClickDelete={handleClickDeleteRow}
            />
          </CardTable>
        </Section>
      </Suspense>

      <Suspense>
        <FormDialog
          edit={isEdit}
          loading={loadingForm}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          visible={visibility}
          onClose={handleClose}
          form={form}
          formError={formError}
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

export default TenantView;
