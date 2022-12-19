import CardTable from "@components/cards/CardTable";
import Confirmation from "@components/dialog/Confirmation";
import FormStatusBooking from "@components/dialog/ModalBooking/FormStatusBooking";
import { TabItem } from "@components/TabBar";
import { TableBooking, createBookingLabel } from "@components/tables/TableBooking";
import DetailDialog from "@components/dialog/DetailDialog";
import useDetail from "@components/dialog/DetailDialog/hooks/useDetail";
import useConfirmation from "@hooks/useConfirmation";
import { IBooking } from "@types";
import { useRouter } from "next/router";
import { Suspense, useMemo, useState, useEffect } from "react";
import useBooking from "./hooks/useBooking";
import Section from "@components/views/Section";
import dynamic from "next/dynamic";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import Add from "@mui/icons-material/Add";
import Cached from "@mui/icons-material/Cached";
import FormBooking from "@components/dialog/ModalBooking/FormBooking";
import { fDateTime } from "@utils/formatTime";


const ActionButton = dynamic(() => import("@components/buttons/ActionButton"), {
  ssr: false,
});

const BookingTableView = () => {
  const router = useRouter();
  const {
    bookings,
    remove,
    updateStatus,
    isLoading,
    isError,
    reload,
    insert,
    inquiry,
    // modal state
    setModalControll,
    modalControll,
    resetModalControll,
    // form state
    form,
    setForm,
    resetForm,
    loadingForm,
  } = useBooking();

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

  const [tabIndex, setTabIndex] = useState<string | number>("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const [showDetail, setShowDetail] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const { detail, setDetail, removeDetail } = useDetail();

  const actionButton: Array<MyAnimatedButtonProps> = [
    {
      title: "Pesan Fasilitas",
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(name, value);
  };

  const handleSelectChange = (name: string, value: any) => {
    setForm(name, value);

    if (form.tenant === null) {
      setForm("propertyUnit", null);
    }
  };

  const onCustomSelectChange = (_event: any, value: any, name: string) => {
    setForm(name, value);
  };

  const handleTabChange = (_e: React.SyntheticEvent<Element, Event>, value: number | string) => {
    setTabIndex(value);
    const { query } = router;
    const queryPamaramaters = { ...query };
    console.log("queryPamaramaters", queryPamaramaters);
    const facility_id = queryPamaramaters?.facility_id || '';
    queryPamaramaters.status = (value as string) || "";

    Object.entries(queryPamaramaters).forEach(([queryKey]) => {
      if (!["status"].includes(queryKey)) {
        delete queryPamaramaters[queryKey];
      }
    });


    router.push({ pathname: '/fasilitas/[facility_id]', query: { ...queryPamaramaters, facility_id } }, undefined, { shallow: true });
  };

  const handleClose = (): void => {
    resetModalControll();
    resetForm();
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    removeDetail();
  };

  const handleClickDetail = (id: number) => {
    setShowDetail(true);
    setLoadingDetail(true);

    // console.log("id ==>", id);

    inquiry(String(id))
      .then((data) => {
        setLoadingDetail(false);
        console.log("data booking ==>", data);

        if (data?.id === 0) {
          // console.log("error data ==>", data);
          return;
        }

        setDetail({
          title: data?.code || '-',
          thumbnail: data?.facility?.pictures?.length && data?.facility?.pictures?.length > 0 ? data?.facility.pictures[0] : "",
          datas: [
            {
              label: "Kode Booking",
              value: data?.code || '-'
            },
            {
              label: "Status",
              value: data?.status || '-'
            },
            {
              label: "Deskripsi",
              value: data?.description || '-'
            },
            // {
            //   label: "Pemesan",
            //   value: data?.contact ? `${data.contact.first_name} ${data?.contact.last_name}` : '-'
            // },
            {
              label: "Tanggal Booking",
              value: data?.created_at ? fDateTime(data.created_at as unknown as string) : '-'
            },
            {
              label: "Tanggal Penggunaan",
              value: `${data?.start ? fDateTime(data.start as unknown as string) : ''} - ${data?.end ? fDateTime(data.end as unknown as string) : ''}`
            },
            {
              label: "Status",
              value: data?.status ? createBookingLabel(data.status) : '-'
            },
            {
              label: "Harga",
              value: String(data?.price)
            },
            {
              label: "Tanggal Slot",
              value: data?.slot_date || '-'
            },
            {
              label: "Penalti",
              value: String(data?.penalty)
            },
            {
              label: "Kode Fasilitas",
              value: data?.facility?.code || '-'
            },
            {
              label: "Nama Fasilitas",
              value: data?.facility?.name || '-'
            }
          ]
        });
      })
      .catch((err) => {
        setLoadingDetail(false);
        console.log("error tenant ==>", err);
      });
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

  const handleSubmit = async () => {
    const payload = {
      facility_id: String(form.facility?.value.id),
      contact_id: String(form.tenant?.value),
      property_unit_id: String(form.propertyUnit),
      assistances: [],
      description: form.description,
      price: form.facility?.value.price ? form.facility?.value.price : 0,
      penalty: form.penalty,
      status: form.status,
      slot_date: form.slot_date,
      slot: {
        start: String(form.bookingSlot?.value.start),
        end: String(form.bookingSlot?.value.end),
      },
    };

    await insert(payload);
  };

  useEffect(() => {
    if (Boolean(router?.query?.status)) {
      setTabIndex(String(router.query.status))
    } else {
      setTabIndex("");

    }
  }, [router?.query?.status])


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
            onClickDetail={handleClickDetail}

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
          loading={loadingForm}
          onInputChange={handleInputChange}
          onCustomSelect={onCustomSelectChange}
          onSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          visible={modalControll.addBooking}
          onClose={handleClose}
          form={form}
        // formError={formError}
        />
      </Suspense>

      <DetailDialog
        title={detail.title}
        loading={false}
        dialogTitle="Detail Booking"
        thumbnail={detail.thumbnail}
        datas={detail.datas}
        visible={showDetail}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default BookingTableView;
