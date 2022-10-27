import CardTable from '@components/cards/CardTable';
import { TabItem } from '@components/TabBar';
import Section from '@components/views/Section';
import { IFacility } from '@types';
import dynamic from 'next/dynamic';
import { ChangeEvent, ReactElement, Suspense, SyntheticEvent, useMemo, useState } from 'react';
import useFacility from './hooks/useFacility';

const TableFacility = dynamic(() => import('@components/tables/TableFacility'), {
  ssr: false,
  suspense: true,
});

const FacilityView = (): ReactElement => {
  const { facilities, isError, isLoading, isReady, reload, isValidating } = useFacility();

  const tabs = useMemo(
    () =>
      [
        {
          label: 'All',
          text: 'All',
          color: 'default',
          value: 'all',
        },
      ] as TabItem[],
    []
  );

  const [searchKeyword, setSearchKeyword] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(e.target.value);
  };

  const handleTabChange = (e: SyntheticEvent<Element, Event>, value: number | string): void => {
    const index = typeof value === 'string' ? parseInt(value) : value;
    setTabIndex(index);
  };

  const handleEdit = (id: number, record: IFacility): void => {
    console.log(id);
  };

  const handleDelete = (id: number) => {};

  return (
    <>
      <Suspense>
        <Section title='Fasilitas' description='Kelola fasilitas properti Anda'>
          <CardTable
            searchPlaceholder='Cari fasilitas'
            searchValue={searchKeyword}
            onChangeSearch={handleChangeSearch}
            tabs={tabs}
            tabIndex={tabIndex}
            withTabs
            searchField
            onReload={reload}
            onChangeTab={handleTabChange}
            error={isError}
          >
            <TableFacility facilities={facilities} onEdit={handleEdit} onDelete={handleDelete} />
          </CardTable>
        </Section>
      </Suspense>
    </>
  );
};

export default FacilityView;
