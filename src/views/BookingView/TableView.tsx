import CardTable from "@components/cards/CardTable";
import Confirmation from "@components/dialog/Confirmation";
import FormStatusBooking from "@components/dialog/ModalBooking/FormStatusBooking";
import { TabItem } from "@components/TabBar";
import { TableBooking } from "@components/tables/TableBooking";
import useConfirmation from "@hooks/useConfirmation";
import useForm from "@hooks/useForm";
import { IBooking } from "@types";
import { useRouter } from "next/router";
import { Suspense, useMemo, useState } from "react";
import useBooking from "./hooks/useBooking";
import Section from "@components/views/Section";
import dynamic from "next/dynamic";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import Add from "@mui/icons-material/Add";
import Cached from "@mui/icons-material/Cached";
import FormBooking from "@components/dialog/ModalBooking/FormBooking";
import { IForm } from "@components/dialog/ModalBooking/FormBooking/FormBooking.interface";

const ActionButton = dynamic(() => import("@components/buttons/ActionButton"), {
  ssr: false,
});

export const BookingTableView = () => {
  const router = useRouter();
  const { bookings, remove, updateStatus, isLoading, isError, reload } = useBooking();

  const tabs: TabItem[] = useMemo(
    () =>
      [
        {
          text: "All",
          color: "default",
          value: "",
        },
        {
          text: "Requested",
          color: "info",
          value: "requested",
        },
        {
          text: "Booked",
          color: "success",
          value: "booked",
        },
        {
          text: "Ongoing",
          color: "warning",
          value: "ongoing",
        },
        {
          text: "No Show",
          color: "error",
          value: "no+show",
        },
        {
          text: "Canceled",
          color: "error",
          value: "canceled",
        },
        {
          text: "Done",
          color: "default",
          value: "done",
        },
      ] as TabItem[],
    []
  );

  const [form, setForm, resetForm, setFormBulk] = useForm<IForm>({
    facility_id: "",
    tenant_id: "",
    property_unit_id: "",
    assistances: [],
    description: "",
    price: 0,
    penalty: 0,
    status: "",
    slot_date: "",
    slot: {
      start: "",
      end: "",
    },
  });
  const [tabIndex, setTabIndex] = useState<string | number>("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [modalControll, setModalControll] = useForm({
    statusBooking: false,
    addBooking: false,
  });
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: "Buat Booking Baru",
      onClick: (): void => setModalControll("addBooking", true),
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

  const handleTabChange = (_e: React.SyntheticEvent<Element, Event>, value: number | string) => {
    setTabIndex(value);
    const { query } = router;
    const queryPamaramaters = { ...query };
    queryPamaramaters.status = (value as string) || "";

    Object.entries(queryPamaramaters).forEach(([queryKey]) => {
      if (!["status"].includes(queryKey)) {
        delete queryPamaramaters[queryKey];
      }
    });

    router.push({ query: { ...queryPamaramaters } }, undefined, { shallow: true });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleEdit = (_id: number, record: IBooking) => {
    setModalControll("statusBooking", true);
    setSelectedBooking(record);
  };

  const handleDelete = (id: number) => {
    deleteConfirmationHandler.open();
    deleteConfirmationHandler.setState(id);
  };

  const handleConfirmDelete = () => {
    deleteConfirmationHandler.confirm().then((id) => remove(id));
  };

  const handleSubmit = () => {};

  return (
    <>
      <Section
        title="Booking Fasilitas"
        description="Kelola pemesanan fasilitas properti Anda"
        actionButton={<ActionButton buttons={actionButton} />}
      >
        <CardTable
          searchPlaceholder="Cari booking..."
          searchValue={searchKeyword}
          onChangeSearch={handleSearch}
          tabs={tabs}
          tabIndex={tabIndex}
          withTabs
          searchField
          onReload={reload}
          onChangeTab={handleTabChange}
          error={isError}
        >
          <TableBooking
            data={bookings}
            totalData={bookings?.length}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardTable>
      </Section>
      <Suspense>
        <FormStatusBooking
          visible={modalControll.statusBooking}
          onClose={() => setModalControll("statusBooking", false)}
          onUpdateState={updateStatus}
          booking={selectedBooking}
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

      <Suspense>
        <FormBooking
          loading={false}
          onInputChange={() => {}}
          onSelectChange={() => {}}
          onSubmit={handleSubmit}
          visible={modalControll.addBooking}
          onClose={() => setModalControll("addBooking", false)}
          form={form}
          // formError={formError}
        />
      </Suspense>
    </>
  );
};
