import CardTable from '@components/cards/CardTable';
import { TabItem } from '@components/TabBar';
import { TableBooking } from '@components/tables/TableBooking';
import { useMemo, useState } from 'react';
import useBooking from './hooks/useBooking';

export const BookingTableView = () => {
  const { bookings, isReady, updateStatus, isLoading, isError } = useBooking();

  const tabs: TabItem[] = useMemo(
    () =>
      [
        {
          text: 'All',
          color: 'default',
        },
        {
          text: 'Requested',
          color: 'info',
        },
        {
          text: 'Booked',
          color: 'success',
        },
        {
          text: 'Ongoing',
          color: 'warning',
        },
        {
          text: 'No Show',
          color: 'error',
        },
        {
          text: 'Canceled',
          color: 'error',
        },
        {
          text: 'Done',
          color: 'default',
        },
      ] as TabItem[],
    []
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleTabChange = (e: React.SyntheticEvent<Element, Event>, value: number | string) => {
    const index = typeof value === 'string' ? parseInt(value) : value;
    setTabIndex(index);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleReload = () => {};

  const handleEdit = (id: number, record: any) => {
    console.log(id);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleUpdateState = (id: number, state: string) => {
    updateStatus(id, state);
  };

  return (
    <CardTable
      searchPlaceholder='Cari booking...'
      searchValue={searchKeyword}
      onChangeSearch={handleSearch}
      tabs={tabs}
      tabIndex={tabIndex}
      withTabs
      searchField
      onReload={handleReload}
      onChangeTab={handleTabChange}
      error={isError}
    >
      <TableBooking
        data={bookings}
        totalData={bookings.length}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdateState={handleUpdateState}
      />
    </CardTable>
  );
};