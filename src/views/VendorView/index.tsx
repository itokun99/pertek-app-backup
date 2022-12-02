import { useState, ReactElement, useContext, Suspense, useMemo } from "react";
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
import FormUploadImage from "@components/dialog/FormUploadImage";
import { TabItem } from "@components/TabBar";
import { useRouter } from "next/router";
import DetailDialog from "@components/dialog/DetailDialog";
import useDetail from "@components/dialog/DetailDialog/hooks/useDetail";

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
  profilePicture: "",
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
  const router = useRouter();
  // contexts
  const { setAlert } = useContext(AlertContext);

  // states
  const [search, setSearch] = useState<string>("");
  const [visibility, setVisibility] = useState(false);
  const [visibilityUploadImage, setVisibilityUploadImage] = useState(false);
  const [tabIndex, setTabIndex] = useState<string | number>("");

  // file
  const [assetsFile, changeAssetsFile] = useState<File | null>(null);
  const [Preview, setPreviewImage] = useState<{ image: string; name: string | undefined }>({
    image: "",
    name: "",
  });

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


  const [showDetail, setShowDetail] = useState(false);
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

  const handleCloseDetail = () => {
    setShowDetail(false);
    removeDetail();
  };

  const handleClickDetail = (id: number) => {
    setShowDetail(true);
    setLoadingDetail(true);

    console.log('id ==>', id);
    inquiry(id)
      .then((data) => {
        setLoadingDetail(false);
        console.log("data vendor ==>", data);
        setDetail({
          title: `${data?.contact.first_name} ${data?.contact.last_name}`,
          thumbnail: data?.contact.profile_picture || '',
          datas: [
            {
              label: "No. Identitas",
              value: `${data?.contact.identity_type} - ${data?.contact.identity}`
            },
            {
              label: "No. Pajak / NPWP",
              value: data?.contact.tax_number ? `${data?.contact.tax_number}` : '-'
            },
            {
              label: "Tipe Profil",
              value: data?.contact.profile_type || '-'
            },
            {
              label: "Alamat",
              value: data?.contact.address || '-'
            },
            ...(data?.contact && data?.contact.emails.length > 0 ? data.contact.emails.map((mail, index) => ({
              label: index === 0 ? 'Email' : '',
              value: `${mail.address} - ${mail.verified ? 'Terverifikasi' : 'Tidak Terverfikasi'}`
            })) : []),
            ...(data?.contact && data?.contact.phones.length > 0 ? data.contact.phones.map((data, index) => ({
              label: index === 0 ? 'Telepon' : '',
              value: `${data.number}`
            })) : [])
          ]
        })
      })
      .catch((err) => {
        setLoadingDetail(false);
        console.log("error staff ==>", err);
      })
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
            profile_picture: profilePicture = "",
          } = data.contact || {};
          setFormBulk({
            id: data.id,
            contactId: String(contactId),
            profilePicture,
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

  const handleUploadImage = () => {
    // console.log("assetsFile ===>", assetsFile);

    const body = new FormData();
    body.append("file", assetsFile as File);
    fetch("https://esri.propertek.id/profile", {
      body,
      method: "POST",
      headers: {
        Authorization: "Bearer YZ_mpyvWP6rz^rhgwnqtUw5aM3SMRQn7",
        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
      },
    })
      .then((response) => {
        console.log(response.json());
        response.json();
      })
      .then((success) => console.info("success", success))
      .catch((error) => console.error("error", error));
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

  const handleChangeImage = (file: File | null, image: string) => {
    changeAssetsFile(file);
    setPreviewImage({ image, name: file?.name });
  };

  const handleRemoveImage = () => {
    changeAssetsFile(null);
    setPreviewImage({ image: "", name: "" });
    setForm("profilePicture", "");
  };

  const handleCloseUploadImage = () => {
    setVisibilityUploadImage(false);
    changeAssetsFile(null);
    setPreviewImage({ image: "", name: "" });
    setForm("profilePicture", "");
  };

  const handleTabChange = (_e: React.SyntheticEvent<Element, Event>, value: number | string) => {
    setTabIndex(value);
    const { query } = router;
    const queryPamaramaters = { ...query };
    queryPamaramaters.type = (value as string) || "";

    Object.entries(queryPamaramaters).forEach(([queryKey]) => {
      if (!["type"].includes(queryKey)) {
        delete queryPamaramaters[queryKey];
      }
    });

    router.push({ query: { ...queryPamaramaters } }, undefined, { shallow: true });
  };

  const tabs: TabItem[] = useMemo(
    () =>
      [
        {
          text: "All",
          color: "default",
          value: "",
        },
        {
          text: "Corporate",
          color: "info",
          value: "Corporate",
        },
        {
          text: "Personal",
          color: "success",
          value: "Personal",
        },
      ] as TabItem[],
    []
  );

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
            onChangeTab={handleTabChange}
            withTabs
            tabs={tabs}
            tabIndex={tabIndex}
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
          onUploadImage={() => setVisibilityUploadImage(true)}
        />
      </Suspense>

      <Suspense>
        <FormUploadImage
          visible={visibilityUploadImage}
          onClose={handleCloseUploadImage}
          loading={false}
          onSubmit={handleUploadImage}
          handleRemoveImage={handleRemoveImage}
          handleChangeImage={handleChangeImage}
          Preview={Preview}
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
        dialogTitle="Detail Vendor"
        thumbnail={detail.thumbnail}
        datas={detail.datas}
        visible={showDetail}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default VendorView;
