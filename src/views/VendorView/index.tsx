import { useState, ReactElement, useContext, Suspense } from "react";
import dynamic from "next/dynamic";
import useConfirmation from "@hooks/useConfirmation";
import useForm from "@hooks/useForm";

import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import { AlertContext } from "@provider/AlertProvider";
import useVendor from "./hook/useVendor";
import Add from "@mui/icons-material/Add";
import FormDialog from "@components/dialog/FormVendor";
import { IMultipleInputItem, validateMultipleInput } from "@components/input/MultipleInput";
import { IForm, IFormError } from "@components/dialog/FormVendor/FormVendor.interface";
import { createContactEmail, deleteContactEmail, updateContactEmail } from "@service/contact-email";
import { createContactPhone, deleteContactPhone, updateContactPhone } from "@service/contact-phone";
import { FetcherResponseError } from "@lib/dataFetcher";
import { ICreateVendorPayload } from "@service/vendor";
import { IVendorEntities } from "@types";
import Cached from "@mui/icons-material/Cached";

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
const TableData = dynamic(() => import("@components/tables/TableVendor"), {
  ssr: false,
  suspense: true,
});
const Confirmation = dynamic(() => import("@components/dialog/Confirmation"), {
  ssr: false,
  suspense: true,
});

const initialForm: IForm = {
  contactId: "",
  id: 0,
  firstName: "",
  lastName: "",
  identity: "",
  identityType: "",
  address: "",
  npwp: "",
  profileType: "",
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
};

const VendorView = (): ReactElement => {
  // contexts
  const { setAlert } = useContext(AlertContext);

  // states
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
  } = useVendor();

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

  const validateForm = (form: IForm, formError: IFormError) => {
    const error = { ...formError };

    if (!form.firstName) {
      error.firstName = "Nama Depan harus diisi";
    }

    if (!form.lastName) {
      error.lastName = "Nama Belakang harus diisi";
    }

    if (!form.npwp) {
      error.npwp = "Npwp Status harus diisi";
    }

    if (!form.identity) {
      error.identity = "Nomor Identitas harus diisi";
    }

    if (!form.identityType) {
      error.identityType = "Harus pilih tipe identitas";
    }

    return error;
  };

  const handleSubmit = async () => {
    const error = validateForm(form, formError);
    const isValid = Object.keys(error).every((key) => !error[key as keyof typeof formError]);

    if (!isValid) {
      setFormErrorBulk(error);
      return;
    } else {
      resetFormError();
    }

    const payload: ICreateVendorPayload = {
      first_name: form.firstName,
      last_name: form.lastName,
      profile_picture: "",
      identity: form.identity,
      identity_type: form.identityType,
      profile_type: form.profileType,
      address: form.address,
      tax_number: Number(form.npwp),
      phone_numbers: validateMultipleInput(form.phones).map((phone) => phone.value),
      emails: validateMultipleInput(form.emails).map((email) => ({
        address: email.value,
        verified: Boolean(email.checked),
        id: email.id || 0,
      })),
    };

    console.info(`payload:`, payload);

    isEdit ? await update(form.id, payload) : await insert(payload);

    if (isEdit) {
      const newEmails = form.emails.filter((v) => !v.id && v.value.trim() !== "");
      const newPhones = form.phones.filter((v) => !v.id && v.value.trim() !== "");

      if (newEmails.length > 0 || newPhones.length > 0) {
        await Promise.all([
          ...(newEmails.length > 0
            ? newEmails.map((email) =>
                createContactEmail({
                  address: email.value,
                  verified: Boolean(email.checked),
                  contact_id: form.contactId,
                })
              )
            : []),
          ...(newPhones.length > 0
            ? newPhones.map((phone) =>
                createContactPhone({
                  contact_id: form.contactId,
                  number: phone.value,
                })
              )
            : []),
        ]);
      }
    }

    setLoadingForm(false);
    setVisibility(false);
    resetForm();
  };

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: "Vendor Baru",
      onClick: (): void => setVisibility(true),
      color: "info",
      startIcon: <Add />,
    },
    {
      title: "Muat Ulang",
      onClick: (): void => reload(),
      color: "info",
      startIcon: <Cached />,
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

  const handleClickEditRow = (id: number, _record: IVendorEntities) => {
    setVisibility(true);

    setLoadingForm(true);
    inquiry(id)
      .then((data) => {
        if (data) {
          // destructuring data and give default value
          const {
            id: contactId = "",
            first_name: firstName = "-",
            last_name: lastName = "-",
            identity = "-",
            identity_type: identityType = "-",
            profile_type: profileType = "-",
            address = "-",
            tax_number: npwp = "-",
            phones: phoneNumbers = [],
            emails,
          } = data.contact || {};
          setFormBulk({
            id: data.id,
            contactId: String(contactId),
            firstName,
            lastName,
            address,
            identity,
            identityType,
            profileType,
            npwp: String(npwp),
            emails: emails.map((email) => ({
              value: email.address,
              checked: email.verified,
              id: email.id,
              disabled: true,
            })),
            phones: phoneNumbers.map((phone) => ({
              value: phone.number,
              id: phone.id,
              disabled: true,
            })),
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

  const handleMultipleInputSingeDelete = async (
    name: string,
    data: IMultipleInputItem
  ): Promise<void> => {
    try {
      const response = await (name === "emails"
        ? deleteContactEmail(data.id as number)
        : deleteContactPhone(data.id as number));
      setAlert({
        message: {
          severity: "success",
          content: `${name === "emails" ? "Email" : "Nomor Telepon"} kontak berhasil dihapus`,
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

  const handleMultipleInputSingleSave = async (
    name: string,
    data: IMultipleInputItem
  ): Promise<void> => {
    try {
      const response =
        name === "emails"
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
          content: `${name === "emails" ? "Email" : "Nomor Telepon"} kontak berhasil diperbarui`,
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

  const handleMultipleInputChange = (name: string, value: IMultipleInputItem[]) => {
    setForm(name, value);
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
          title="Vendor"
          description="Kelola vendor properti Anda"
          stackProps={{ mt: 12 }}
          actionButton={<ActionButton buttons={actionButton} />}
        >
          <CardTable
            searchPlaceholder="Cari Vendor"
            searchValue={search}
            onChangeSearch={handleChangeSearch}
            searchField
            onReload={reload}
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
          onMultipleInputSave={handleMultipleInputSingleSave}
          onMultipleInputDelete={handleMultipleInputSingeDelete}
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

export default VendorView;
