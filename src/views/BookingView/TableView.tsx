import CardTable from "@components/cards/CardTable";
import FormStatusBooking from "@components/dialog/FormStatusBooking";
import { TabItem } from "@components/TabBar";
import { TableBooking } from "@components/tables/TableBooking";
import useForm from "@hooks/useForm";
import { IBooking } from "@types";
import { useRouter } from "next/router";
import { Suspense, useMemo, useState } from "react";
import useBooking from "./hooks/useBooking";

export const BookingTableView = () => {
  const router = useRouter();
  const { bookings, isReady, updateStatus, isLoading, isError, reload } = useBooking();

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
          value: "no-show",
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
  const [modalControll, setModalControll] = useForm({
    statusBooking: false,
  });
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

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
    console.log(id);
  };

  return (
    <>
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
      <Suspense>
        <FormStatusBooking
          visible={modalControll.statusBooking}
          onClose={() => setModalControll("statusBooking", false)}
          onUpdateState={updateStatus}
          booking={selectedBooking}
        />
      </Suspense>
    </>
  );
};
