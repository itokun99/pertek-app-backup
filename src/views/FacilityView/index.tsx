import ActionButton from "@components/buttons/ActionButton";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import FormCategory from "@components/dialog/ModalCategory/FormCategory";
import FormFacility from "@components/dialog/ModalFacility/FormFacility";
import { TabItem } from "@components/TabBar";
import Section from "@components/views/Section";
import { Add } from "@mui/icons-material";
import { Grid, useTheme } from "@mui/material";
import { IFacility } from "@types";
import React, { ReactElement, Suspense, useMemo } from "react";
import { DetailViewFacility } from "./details";
import { FacilityCard } from "./FacilityCardItem";
import useFacility from "./hooks/useFacility";

const FacilityView = (): ReactElement => {
  const {
    facilities,
    currentFacility,
    isError,
    isLoading,
    isReady,
    reload,
    isValidating,
    setCurrentFacility,
    modalControll,
    setModalControll,
    resetModalControll,

    // form facility
    formFacility,
    // form category
    loadingForm,
    formCategory,
    handleOnInputChange,
    handleSelectChange,
    handleAddCategory,
    handleCloseModalCategory,
  } = useFacility();

  const tabs = useMemo(
    () =>
      [
        {
          text: "All",
          color: "default",
        },
      ] as TabItem[],
    []
  );

  const actionButtons: MyAnimatedButtonProps[] = useMemo(() => {
    return [
      {
        title: "Fasilitas",
        color: "info",
        startIcon: <Add />,
        onClick: () => setModalControll("formFacility", true),
      },
      {
        title: "Kategori Fasilitas",
        color: "warning",
        startIcon: <Add />,
        onClick: () => setModalControll("addCategory", true),
      },
    ];
  }, [setModalControll]);

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
          title="Fasilitas"
          description="Kelola fasilitas properti Anda"
          actionButton={<ActionButton buttons={actionButtons} />}
        >
          <Grid container spacing={3}>
            {facilities.map((f) => (
              <Grid key={f.id} item xs={12} sm={6} md={4} lg={2.4}>
                <FacilityCard key={f.id} facility={f} onClick={handleOpenDetail} />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Suspense>
      <Suspense>
        {currentFacility && (
          <DetailViewFacility facility={currentFacility} onClose={handleCloseDetail} />
        )}
      </Suspense>
      <Suspense>
        <FormFacility
          loading={loadingForm}
          onInputChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleOnInputChange(event, "facility")
          }
          edit={Boolean(formFacility.id)}
          onSelectChange={handleSelectChange}
          onSubmit={() => {}}
          visible={modalControll.formFacility}
          onClose={handleCloseModalCategory}
          form={formFacility}
        />
      </Suspense>
      <Suspense>
        <FormCategory
          loading={loadingForm}
          onInputChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleOnInputChange(event, "category")
          }
          onSubmit={handleAddCategory}
          visible={modalControll.addCategory}
          onClose={handleCloseModalCategory}
          form={formCategory}
        />
      </Suspense>
    </>
  );
};

export default FacilityView;
