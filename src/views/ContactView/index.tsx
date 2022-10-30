import Add from "@mui/icons-material/Add";
import { useMemo, useState, ReactElement, useContext, useEffect, Suspense } from "react";

import useConfirmation from "@hooks/useConfirmation";
import useForm from "@hooks/useForm";
import { SelectOptionType, IContact, IContactEmail } from "@general-types";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import { AlertContext } from "@provider/AlertProvider";
import useContact from "./hook/useContact";
import { ICreateContactPayload } from "@service/contact";
import dynamic from "next/dynamic";
import { TabItem } from "@components/TabBar";
import FormDialog, { IForm, IFormError } from "@components/dialog/FormContact";
import { IMultipleInputItem, validateMultipleInput } from "@components/input/MultipleInput";
import { deleteContactEmail, updateContactEmail, createContactEmail } from "@service/contact-email";
import { FetcherResponseError } from "@lib/dataFetcher";
import { deleteContactPhone, updateContactPhone, createContactPhone } from "@service/contact-phone";

const ActionButton = dynamic(() => import("@components/buttons/ActionButton"), {
  ssr: false,
});

const Section = dynamic(() => import("@components/views/Section"), {
  ssr: false,
  suspense: true,
});
const CardTable = dynamic(() => import("@components/cards/CardTable"), {
  ssr: false,
  suspense: true,
});
const TableData = dynamic(() => import("@components/tables/TableContact"), {
  ssr: false,
  suspense: true,
});
const Confirmation = dynamic(() => import("@components/dialog/Confirmation"), {
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
  npwp: "",
  profileType: "",
  property: {
    label: "",
    value: "",
  },
  role: {
    label: "",
    value: "",
  },
  roleGroup: {
    label: "",
    value: "",
  },
  emails: [],
  phones: [],
};

const initialFormError: IFormError = {
  firstName: "",
  lastName: "",
  address: "",
  identity: "",
  identityType: "",
  profileType: "",
  npwp: "",
  property: "",
};

const ContactView = (): ReactElement => {
  // contexts
  const { setAlert } = useContext(AlertContext);

  // states
  const [tabIndex, setTabIndex] = useState<string | number>("all");
  const [search, setSearch] = useState<string>("");
  const [visibility, setVisibility] = useState(false);

  // custom hooks
  const [form, setForm, resetForm, setFormBulk] = useForm<IForm>(initialForm);
  const [formError, setFormError, resetFormError, setFormErrorBulk] =
    useForm<IFormError>(initialFormError);

  const {
    content: deleteConfirmation,
    handler: deleteConfirmationHandler,
    visibility: deleteConfirmationVisibility,
  } = useConfirmation<number>(
    {
      title: "Konfirmasi Hapus",
      description: "Apakah kamu yakin ingin menghapus item ini?",
      cancelText: "Kembali",
      confirmText: "Ya",
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
    setLoadingForm,
  } = useContact();

  // other hooks
  const tabs = useMemo(
    (): TabItem[] => [
      {
        label: "",
        text: "Semua",
        color: "default",
        value: "all",
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
      setFormError(name, "");
    }
  };

  const handleSelectChange = (name: string, value: any) => {
    setForm(name, value);

    if (formError[name as keyof typeof formError]) {
      setFormError(name, "");
    }
  };

  const handleMultipleInputChange = (name: string, value: IMultipleInputItem[]) => {
    setForm(name, value);
  };

  const handleTabChange = (_e: React.SyntheticEvent<Element, Event>, value: number | string) => {
    setTabIndex(value);
  };

  const validateForm = (form: IForm, formError: IFormError) => {
    const error = { ...formError };
    if (!form.firstName) {
      error.firstName = "Nama depan harus diisi";
    }

    if (!form.identityType) {
      error.identityType = "Tipe identitas harus diisi";
    }

    if (!form.identity) {
      error.identity = "Nomor Identitas harus diisi";
    }

    if (!form.address) {
      error.address = "Alamat harus diisi";
    }

    if (!form.profileType) {
      error.profileType = "Tipe profil harus diisi";
    }

    return error;
  };

  const handleSubmit = async () => {
    // it should check if the form is empty

    const error = validateForm(form, formError);
    const isValid = Object.keys(error).every((key) => !error[key as keyof typeof formError]);

    if (!isValid) {
      // console.log("masuk sini12", error)
      setFormErrorBulk(error);
      return;
    } else {
      resetFormError();
    }

    const payload: ICreateContactPayload = {
      first_name: form.firstName,
      last_name: form.lastName,
      address: form.address,
      identity: form.identity,
      identity_type: form.identityType,
      profile_type: form.profileType,
      role_id: Number(form.role?.value) || 0,
      role_group_id: Number(form.roleGroup?.value) || 0,
      property_id: Number(form.property?.value) || 0,
      tax_number: Number(form.npwp),
      emails: validateMultipleInput(form.emails).map((email) => ({
        address: email.value,
        verified: email.checked || false,
        id: email.id,
      })),
      phone_numbers: validateMultipleInput(form.phones).map((phone) => phone.value),
    };

    try {
      setLoadingForm(true);
      isEdit ? await update(form.id, payload) : await insert(payload);

      if (isEdit) {
        const newEmails = form.emails.filter(v => !v.id);
        const newPhones = form.phones.filter(v => !v.id);

        if (newEmails.length > 0 || newPhones.length > 0) {
          await Promise.all([
            ...(newEmails.length > 0 ? newEmails.map(email => createContactEmail({
              address: email.value,
              verified: Boolean(email.checked),
              contact_id: form.id
            })) : []),
            ...(newPhones.length > 0 ? newPhones.map(phone => createContactPhone({
              contact_id: form.id,
              number: phone.value
            })) : [])
          ])
        }
      }

      setLoadingForm(false);

    } catch (err) {
      const error = err as FetcherResponseError;
      setLoadingForm(false);
      setAlert({
        message: {
          severity: "error",
          content: error?.message || "Terjadi kesalahan",
        },
      });
    }
  };

  const handleMultipleInputSingeDelete = async (name: string, data: IMultipleInputItem): Promise<void> => {
    try {
      const response = await (name === 'emails' ? deleteContactEmail(data.id as number) : deleteContactPhone(data.id as number));
      setAlert({
        message: {
          severity: "success",
          content: `${name === 'emails' ? 'Email' : 'Nomor Telepon'} kontak berhasil dihapus`,
        },
      });
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: "error",
          content: error?.message || "Terjadi kesalahan",
        },
      });
      throw err;
    }
  };

  const handleMultipleInputSingleSave = async (name: string, data: IMultipleInputItem): Promise<void> => {
    try {
      const response = name === "emails"
        ? await updateContactEmail(data.id as number, {
          contact_id: form.id,
          address: data.value,
          verified: data.checked as boolean,
        })
        : await updateContactPhone(data.id as number, {
          contact_id: form.id,
          number: data.value,
        });
      setAlert({
        message: {
          severity: "success",
          content: `${name === 'emails' ? 'Email' : 'Nomor Telepon'} kontak berhasil diperbarui`,
        },
      });
      return;
    } catch (err) {
      const error = err as FetcherResponseError;
      setAlert({
        message: {
          severity: "error",
          content: error?.message || "Terjadi kesalahan",
        },
      });
      throw err;
    }
  };

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: "Kontak Baru",
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
    resetFormError();
  };

  const handleClickEditRow = (id: number, _record: IContact) => {
    setVisibility(true);

    setLoadingForm(true);
    inquiry(id)
      .then((data) => {
        console.log("data", data);
        if (data) {
          setFormBulk({
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            id: data.id,
            identity: data.identity,
            identityType: data.identity_type,
            profileType: data.profile_type,
            npwp: data.npwp,
            property: {
              label: data.property.name,
              value: String(data.property.id),
            },
            emails: data.emails.map((email) => ({
              value: email.address,
              checked: email.verified,
              id: email.id,
              disabled: true,
            })),
            phones: data.phone_numbers.map((phone) => ({
              value: phone.number,
              id: phone.id,
              disabled: true,
            })),
            role: {
              label: data.role.name,
              value: String(data.role.id),
            },
            roleGroup: {
              label: "",
              value: "",
            },
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
          title="Kontak"
          description="management kelola kontak"
          stackProps={{ mt: 12 }}
          actionButton={<ActionButton buttons={actionButton} />}
        >
          <CardTable
            searchPlaceholder="Cari Kontak"
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
          onMultipleInputChange={handleMultipleInputChange}
          onSubmit={handleSubmit}
          visible={visibility}
          onClose={handleClose}
          form={form}
          formError={formError}
          onMultipleInputSave={handleMultipleInputSingleSave}
          onMultipleInputDelete={handleMultipleInputSingeDelete}
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
