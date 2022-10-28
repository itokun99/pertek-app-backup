import CardTable from '@components/cards/CardTable';
import { TabItem } from '@components/TabBar';
import Section from '@components/views/Section';
import { Avatar, Box, Button, Card, CardActionArea, Grid, Link, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { IFacility } from '@types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ChangeEvent, ReactElement, Suspense, SyntheticEvent, useMemo, useState } from 'react';
import { DetailViewFacility } from './details';
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
          text: 'All',
          color: 'default',
        },
      ] as TabItem[],
    []
  );

  const [searchKeyword, setSearchKeyword] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [facility, setFacility] = useState<IFacility | null>();

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
    setFacility(facility);
  };

  const handleDelete = (id: number) => {};

  const handleCloseDetail = () => {
    setFacility(null);
  };

  return (
    <>
      <Suspense>
        <Section title='Fasilitas' description='Kelola fasilitas properti Anda'>
          <Grid container spacing={3}>
            {facilities.map((f) => {
              return (
                <Grid key={f.id} item xs={12} md={3}>
                  <Card key={f.id}>
                    <CardActionArea onClick={() => handleOpenDetail(f)}>
                      <Stack direction='column' p={2}>
                        <Avatar sx={{ width: '100%', height: 230 }} variant='rounded'>
                          <Image
                            src='/static/images/product_3.jpg'
                            alt={f.name}
                            layout='fill'
                            width='100%'
                            height='100%'
                          />
                        </Avatar>
                        <Box mt={5}>
                          <Typography variant='subtitle1'>{f.name}</Typography>
                          <Typography variant='body2'>{f.category.name}</Typography>
                        </Box>
                      </Stack>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Section>
      </Suspense>
      <Suspense>{facility && <DetailViewFacility facility={facility} onClose={handleCloseDetail} />}</Suspense>
    </>
  );
};

export default FacilityView;
