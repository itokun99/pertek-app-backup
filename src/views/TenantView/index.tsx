import Add from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useMemo, useState, ReactElement, useContext, useEffect, Suspense } from "react";

import useConfirmation from "@hooks/useConfirmation";
import useForm from "@hooks/useForm";
import { ITenant } from "@general-types";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import { AlertContext } from "@provider/AlertProvider";
import useTenant from "./hook/useTenant";
import dynamic from "next/dynamic";
import { TabItem } from "@components/TabBar";
import FormDialog from "@components/dialog/FormTenant";
import { IMultipleInputItem, validateMultipleInput } from "@components/input/MultipleInput";
import CloudDownload from "@mui/icons-material/CloudDownload";
import CloudUpload from "@mui/icons-material/CloudUpload";
import { ICreateTenantPayload } from "@service/tenant";
import Label from "@components/Label";
import { IForm, IFormError } from "@components/dialog/FormTenant/FormTenant.interface";
import { deleteContactEmail, updateContactEmail } from "@service/contact-email";
import { deleteContactPhone, updateContactPhone } from "@service/contact-phone";
import { FetcherResponseError } from "@lib/dataFetcher";

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
const TableData = dynamic(() => import("@components/tables/TableTenant"), {
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
  role: {
    label: "",
    value: "",
  },
  roleGroup: {
    label: "",
    value: "",
  },
  propertyUnit: {
    label: "",
    value: "",
  },
  emails: [],
  phones: [],
  checkIn: null,
  checkOut: null,
  familyStatus: "",
  parentTenancy: "",
  tenancy_role: "Tenant",
  residentStatus: "",
};

const initialFormError: IFormError = {
  firstName: "",
  lastName: "",
  address: "",
  identity: "",
  identityType: "",
  profileType: "",
  npwp: "",
  checkIn: "",
  checkOut: "",
  familyStatus: "",
  propertyUnit: "",
  residentStatus: "",
  parentTenancy: "",
  tenancy_role: "",
};

const TenantView = (): ReactElement => {
  // contexts
  const { setAlert } = useContext(AlertContext);

  const router = useRouter();

  // states
  const [tabIndex, setTabIndex] = useState<string | number>("");
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
    downloadTemplate,
    setLoadingForm,
  } = useTenant();

  // other hooks
  const tabs = useMemo(
    (): TabItem[] => [
      {
        label: "",
        text: "Semua",
        color: "default",
        value: "",
      },
      {
        label: "",
        text: "Pending",
        color: "default",
        value: "pending",
      },
      {
        label: "",
        text: "Verified",
        color: "default",
        value: "verified",
      },
      {
        label: "",
        text: "Blocked",
        color: "default",
        value: "blocked",
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

    if (name === "propertyUnit") {
      setForm("parentTenancy", "");
    }
  };

  const handleTabChange = (_e: React.SyntheticEvent<Element, Event>, value: number | string) => {
    setTabIndex(value);
    const { query } = router;
    const queryPamaramaters = { ...query };
    queryPamaramaters.status = (value as string) || "";

    // it should delete unnecessary params || todo: clear empty object
    Object.entries(queryPamaramaters).forEach(([queryKey]) => {
      if (!["status"].includes(queryKey)) {
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

    if (!form.propertyUnit || !form.propertyUnit.value) {
      error.propertyUnit = "Properti Unit harus diisi";
    }

    if (!form.residentStatus) {
      error.residentStatus = "Resident Status harus diisi";
    }

    if (!form.familyStatus) {
      error.familyStatus = "Family Status harus diisi";
    }

    if (!form.checkIn) {
      error.checkIn = "Check In harus diisi";
    }

    if (!form.checkOut) {
      error.checkOut = "Check Out harus diisi";
    }

    return error;
  };

  const handleSubmit = () => {
    const error = validateForm(form, formError);
    const isValid = Object.keys(error).every((key) => !error[key as keyof typeof formError]);

    if (!isValid) {
      setFormErrorBulk(error);
      return;
    } else {
      resetFormError();
    }

    const payload: ICreateTenantPayload = {
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
        // id: email.id || 0,
      })),
      resident_status: form.residentStatus,
      family_status: form.familyStatus,
      check_in: form.checkIn,
      check_out: form.checkOut,
      property_unit_id: form.propertyUnit?.value,
      parent_tenant_id: form.parentTenancy, // should get from value because it's an object select
      tenancy_role: form.tenancy_role,
    };

    console.log(`payload: `, payload);

    setLoadingForm(true);
    (isEdit ? update(form.id, payload) : insert(payload))
      .then(() => {
        setVisibility(false);
        resetForm();
        setLoadingForm(false);
      })
      .catch((err) => {
        setLoadingForm(false);
        console.log("err", err);
      });
  };

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: "Tenant Baru",
      onClick: (): void => setVisibility(true),
      color: "info",
      startIcon: <Add />,
    },
    {
      title: "Template",
      onClick: downloadTemplate,
      color: "warning",
      startIcon: <CloudDownload />,
    },
    {
      title: "Upload CSV",
      onClick: (): void => {},
      color: "success",
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
          console.info(`data: `, data);
          //     setFormBulk({
          //       checkIn: data.check_in,
          //       checkOut: data.check_out,
          //       id: data.id,
          //       familyStatus: data.family_status,
          //       parentTenancy: String(data.parent_tenancy_id),
          //       propertyUnit: {
          //         label: "",
          //         value: String(data.property_unit_id),
          //       },
          //       residentStatus: data.resident_status,
          //     });
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

  // lifecycle methods
  useEffect(() => {
    if (form.parentTenancy) {
      setForm("residentStatus", "Verified");
    }
  }, [form.parentTenancy, setForm]);

  return (
    <>
      <Suspense>
        <Section
          title="Tenant"
          description="Kelola tenant properti Anda"
          stackProps={{ mt: 12 }}
          actionButton={<ActionButton buttons={actionButton} />}
        >
          <CardTable
            searchPlaceholder="Cari Tenant"
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

export default TenantView;
