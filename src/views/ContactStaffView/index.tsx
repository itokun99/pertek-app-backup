import { useState, ReactElement, useContext, Suspense } from "react";
import dynamic from "next/dynamic";
import useConfirmation from "@hooks/useConfirmation";
import useForm from "@hooks/useForm";

import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import { AlertContext } from "@provider/AlertProvider";
import useContactStaff from "./hook/useContactStaff";
import Add from "@mui/icons-material/Add";
import FormDialog from "@components/dialog/FormStaff";
import { IMultipleInputItem, validateMultipleInput } from "@components/input/MultipleInput";
import { IForm, IFormError } from "@components/dialog/FormStaff/FormStaff.interface";
import { createContactEmail, deleteContactEmail, updateContactEmail } from "@service/contact-email";
import { createContactPhone, deleteContactPhone, updateContactPhone } from "@service/contact-phone";
import { FetcherResponseError } from "@lib/dataFetcher";
import { IContactStaffEntities } from "@types";
import Cached from "@mui/icons-material/Cached";
import { ICreateContactStaffPayload } from "@service/contact-staff";
import { formatCurrency, formatRemoveNonDigit } from "@utils/formatCurrency";
import Button from "@mui/material/Button/Button";
import DetailDialog from "@components/dialog/DetailDialog";
import useDetail from "@components/dialog/DetailDialog/hooks/useDetail";
import DialogFilter from "./components/DialogFilter";

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
const TableData = dynamic(() => import("@components/tables/TableStaff"), {
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
  // new payload
  base_salary: "0",
  position: "",
  company_department_id: {
    label: "",
    value: "",
  },
  join_date: "",
  staff_code: "",
  status: "",
  emails: [],
  phones: [],
};

const initialFormError: IFormError = {
  profile_picture: "",
  firstName: "",
  lastName: "",
  address: "",
  identity: "",
  identityType: "",
  profileType: "",
  npwp: "",
};

const StaffView = (): ReactElement => {
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
  } = useContactStaff();

  const [showDetail, setShowDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const { detail, setDetail, removeDetail } = useDetail();

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

    const basicSalary = formatRemoveNonDigit(String(form.base_salary));

    const payload: ICreateContactStaffPayload = {
      first_name: form.firstName,
      last_name: form.lastName,
      profile_picture: "",
      identity: form.identity,
      identity_type: form.identityType,
      profile_type: form.profileType,
      address: form.address,
      tax_number: Number(form.npwp),
      // new payload
      base_salary: basicSalary !== "" ? Number(basicSalary) : 0,
      department_id: form.company_department_id?.value,
      join_date: form.join_date,
      position: form.position,
      status: form.status,
      staff_code: form.staff_code,

      phone_numbers: validateMultipleInput(form.phones).map((phone) => phone.value),
      emails: validateMultipleInput(form.emails).map((email) => ({
        address: email.value,
        verified: Boolean(email.checked),
        id: email.id || 0,
      })),
    };

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
      title: "Karyawan Baru",
      onClick: (): void => setVisibility(true),
      color: "info",
      startIcon: <Add />,
    },
    {
      title: "Muat Ulang",
      onClick: (): void => reload(),
      color: "inherit",
      startIcon: <Cached />,
    },
  ];

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClose = (): void => {
    setVisibility(false);
    resetForm();
    resetFormError();
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    removeDetail();
  };

  const handleClickDetail = (id: number) => {
    setShowDetail(true);
    setLoadingDetail(true);
    inquiry(id)
      .then((data) => {
        setLoadingDetail(false);
        console.log("data staff ==>", data);
        setDetail({
          title: `${data?.contact.first_name} ${data?.contact.last_name}`,
          thumbnail: data?.contact.profile_picture || "",
          datas: [
            {
              label: "Posisi",
              value: data?.position || "-",
            },
            {
              label: "Kode Staff",
              value: data?.staff_code || "-",
            },
            {
              label: "Status",
              value: data?.status || "-",
            },
            {
              label: "Tanggal Join",
              value: data?.join_date || "-",
            },
            {
              label: "Departemen",
              value: data?.department.name || "-",
            },
            {
              label: "No. Identitas",
              value: `${data?.contact.identity_type} - ${data?.contact.identity}`,
            },
            {
              label: "No. Pajak / NPWP",
              value: data?.contact.tax_number ? `${data?.contact.tax_number}` : "-",
            },
            {
              label: "Tipe Profil",
              value: data?.contact.profile_type || "-",
            },
            {
              label: "Alamat",
              value: data?.contact.address || "-",
            },
            ...(data?.contact && data?.contact.emails.length > 0
              ? data.contact.emails.map((mail, index) => ({
                  label: index === 0 ? "Email" : "",
                  value: `${mail.address} - ${
                    mail.verified ? "Terverifikasi" : "Tidak Terverfikasi"
                  }`,
                }))
              : []),
            ...(data?.contact && data?.contact.phones.length > 0
              ? data.contact.phones.map((data, index) => ({
                  label: index === 0 ? "Telepon" : "",
                  value: `${data.number}`,
                }))
              : []),
          ],
        });
      })
      .catch((err) => {
        setLoadingDetail(false);
        console.log("error staff ==>", err);
      });
  };

  const handleClickEditRow = (id: number, _record: IContactStaffEntities) => {
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

          const {
            base_salary: baseSalary = "",
            position = "-",
            join_date: joinDate = "",
            staff_code: staffCode = "-",
            status = "-",
          } = data || {};
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
            base_salary: formatCurrency(String(baseSalary), "Rp"),
            position,
            company_department_id: {
              value: data.department?.id,
              label: data.department?.name,
            },
            join_date: joinDate,
            staff_code: staffCode,
            status,
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

  const renderFilter = () => <Button onClick={() => setShowFilter(!showFilter)}>Filter</Button>;

  return (
    <>
      <Suspense>
        <Section
          title="Karyawan"
          description="Kelola karyawan properti Anda"
          stackProps={{ mt: 12 }}
          actionButton={<ActionButton buttons={actionButton} />}
        >
          <CardTable
            searchPlaceholder="Cari Karyawan"
            searchValue={search}
            onChangeSearch={handleChangeSearch}
            searchField
            onReload={reload}
            rightContent={renderFilter()}
            error={Boolean(isError)}
          >
            <TableData
              ready={isReady}
              data={items}
              total={dataMeta?.itemsTotal || items.length}
              loading={isLoading || isValidating}
              onClickEdit={handleClickEditRow}
              onClickDelete={handleClickDeleteRow}
              onClickDetail={handleClickDetail}
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
      <DetailDialog
        title={detail.title}
        loading={false}
        dialogTitle="Detail Karyawan"
        thumbnail={detail.thumbnail}
        datas={detail.datas}
        visible={showDetail}
        onClose={handleCloseDetail}
      />

      <Suspense>
        <DialogFilter visible={showFilter} onClose={() => setShowFilter(!showFilter)} />
      </Suspense>
    </>
  );
};

export default StaffView;
