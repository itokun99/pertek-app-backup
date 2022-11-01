import ActionButton from '@components/buttons/ActionButton';
import { MyAnimatedButtonProps } from '@components/buttons/AnimatedButton';
import { TabItem } from '@components/TabBar';
import Section from '@components/views/Section';
import { Add } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, Grid, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { IFacility } from '@types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, ReactElement, Suspense, SyntheticEvent, useMemo, useState } from 'react';
import { FacilityCard } from './FacilityCardItem';
import { DetailViewFacility } from './details';
import useFacility from './hooks/useFacility';

// const TableFacility = dynamic(() => import('@components/tables/TableFacility'), {
//   ssr: false,
//   suspense: true,
// });

const FacilityView = (): ReactElement => {
  const { facilities, currentFacility, isError, isLoading, isReady, reload, isValidating, setCurrentFacility } =
    useFacility();

  const tabs = useMemo(
    () =>
      [
        {
          text: 'All',
          color: 'default',
        },
      ] as TabItem[],
    []
  );

  const actionButtons: MyAnimatedButtonProps[] = useMemo(() => {
    return [
      {
        title: 'Fasilitas',
        color: 'info',
        startIcon: <Add />,
        onClick: () => {},
      },
      {
        title: 'Kategori Fasilitas',
        color: 'warning',
        startIcon: <Add />,
        onClick: () => {},
      },
    ];
  }, []);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const theme = useTheme();

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

  const handleOpenDetail = (facility: IFacility) => {
    setCurrentFacility(facility);
  };

  const handleDelete = (id: number) => {};

  const handleCloseDetail = () => {
    setCurrentFacility(null);
  };

  return (
    <>
      <Suspense>
        <Section
          title='Fasilitas'
          description='Kelola fasilitas properti Anda'
          actionButton={<ActionButton buttons={actionButtons} />}
        >
          <Grid container spacing={3}>
            {facilities.map((f) => (
              <Grid key={f.id} item xs={12} md={3}>
                <FacilityCard key={f.id} facility={f} onClick={handleOpenDetail} />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Suspense>
      <Suspense>
        {currentFacility && <DetailViewFacility facility={currentFacility} onClose={handleCloseDetail} />}
      </Suspense>
    </>
  );
};

export default FacilityView;
