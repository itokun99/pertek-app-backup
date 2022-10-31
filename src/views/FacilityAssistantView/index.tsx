import ActionButton from '@components/buttons/ActionButton';
import { MyAnimatedButtonProps } from '@components/buttons/AnimatedButton';
import { TabItem } from '@components/TabBar';
import Section from '@components/views/Section';
import { Add } from '@mui/icons-material';
import { Card, CardActionArea, Grid, Typography, useTheme } from '@mui/material';
import { IFacilityAssistant } from '@types';
import dynamic from 'next/dynamic';
import { ChangeEvent, ReactElement, Suspense, SyntheticEvent, useMemo, useState } from 'react';
import { DetailViewFacilityAssistant } from './details';
import { FacilityAssistantCard } from './FacilityAssistantCardItem';
import useFacilityAssistant from './hooks/useFacilityAssistant';

const TableFacilityAssistantView = dynamic(() => import('@components/tables/TableFacilityAssistant'), {
  ssr: false,
  suspense: true,
});

const FacilityAssitantView = (): ReactElement => {
  const {
    assistants,
    currentFacilityAssistant,
    isError,
    isLoading,
    isReady,
    reload,
    isValidating,
    setCurrentFacilityAssistant,
  } = useFacilityAssistant();

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
        title: 'Asisten Fasilitas',
        color: 'info',
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

  const handleEdit = (id: number, record: IFacilityAssistant): void => {
    console.log(id);
  };

  const handleOpenDetail = (assistant: IFacilityAssistant) => {
    setCurrentFacilityAssistant(assistant);
  };

  const handleDelete = (id: number) => {};

  const handleCloseDetail = () => {
    setCurrentFacilityAssistant(null);
  };

  console.log('currentFacilityAssistant', assistants);

  return (
    <>
      <Suspense>
        <Section
          title='Asisten Fasilitas'
          description='Kelola asisten fasilitas properti Anda'
          actionButton={<ActionButton buttons={actionButtons} />}
        >
          {assistants && (
            <Grid container spacing={2}>
              {assistants.map((assistant) => (
                <FacilityAssistantCard assistant={assistant} onClick={handleOpenDetail} key={assistant.id} />
              ))}
            </Grid>
          )}
        </Section>
      </Suspense>
      <Suspense>
        {currentFacilityAssistant && (
          <DetailViewFacilityAssistant assistant={currentFacilityAssistant} onClose={handleCloseDetail} />
        )}
      </Suspense>
    </>
  );
};

export default FacilityAssitantView;
