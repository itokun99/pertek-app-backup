import ActionButton from "@components/buttons/ActionButton";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import FormCategory from "@components/dialog/ModalCategory/FormCategory";
import { TabItem } from "@components/TabBar";
import Section from "@components/views/Section";
import { Add } from "@mui/icons-material";
import { Grid, useTheme } from "@mui/material";
import { IFacility } from "@types";
import { ChangeEvent, ReactElement, Suspense, SyntheticEvent, useMemo, useState } from "react";
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

    // form category
    loadingForm,
    formCategory,
    handleFormCategoryChange,
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
        onClick: () => {},
      },
      {
        title: "Kategori Fasilitas",
        color: "warning",
        startIcon: <Add />,
        onClick: () => setModalControll("addCategory", true),
      },
    ];
  }, []);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const theme = useTheme();

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(e.target.value);
  };

  const handleTabChange = (e: SyntheticEvent<Element, Event>, value: number | string): void => {
    const index = typeof value === "string" ? parseInt(value) : value;
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
        <FormCategory
          loading={loadingForm}
          onInputChange={handleFormCategoryChange}
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
