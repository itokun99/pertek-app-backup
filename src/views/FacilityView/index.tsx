import ActionButton from "@components/buttons/ActionButton";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import Confirmation from "@components/dialog/Confirmation";
import FormCategory from "@components/dialog/ModalCategory/FormCategory";
import FormFacility from "@components/dialog/ModalFacility/FormFacility";
import { TabItem } from "@components/TabBar";
import Section from "@components/views/Section";
import useConfirmation from "@hooks/useConfirmation";
import { Add, Cached } from "@mui/icons-material";
import { Grid, useTheme } from "@mui/material";
import { IFacility } from "@types";
import React, { ReactElement, Suspense, useMemo } from "react";
import { useRouter } from 'next/router'

import { DetailViewFacility } from "./details";
import { FacilityCard } from "./FacilityCardItem";
import useFacility from "./hooks/useFacility";

const FacilityView = (): ReactElement => {


  const router = useRouter();

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
    insert,
    update,
    remove,
    inquiry,
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
      {
        title: "Muat Ulang",
        onClick: (): void => reload(),
        color: "inherit",
        startIcon: <Cached />,
      },
    ];
  }, [setModalControll, reload]);

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

  const handleOpenDetail = (facility: IFacility | null) => {
    // setCurrentFacility(facility);
    router.push({
      pathname: '/fasilitas/[facility_id]',
      query: {
        facility_id: facility?.id || ''
      }
    });
  };

  const handleDelete = (id: string) => {
    deleteConfirmationHandler.open();
    deleteConfirmationHandler.setState(Number(id));
  };

  const handleEdit = (id: string) => {
    inquiry(id);
  };

  const handleCloseDetail = () => {
    setCurrentFacility(null);
  };

  const handleConfirmDelete = () => {
    deleteConfirmationHandler.confirm().then((id: any) => remove(id));
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
              <Grid key={f.id} item xs={12} sm={6} md={6} lg={3}>
                <FacilityCard
                  key={f.id}
                  facility={f}
                  onClickEdit={handleEdit}
                  onClickDelete={handleDelete}
                  onClickDetail={handleOpenDetail}
                />
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
          onSubmit={formFacility.id ? update : insert}
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

export default FacilityView;
