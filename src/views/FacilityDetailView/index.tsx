import ActionButton from "@components/buttons/ActionButton";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import { TabItem } from "@components/TabBar";
import Section from "@components/views/Section";
import Cached from "@mui/icons-material/Cached";
import React, { ReactElement, Suspense, useMemo } from "react";
import { DetailViewFacility } from "./details";
import useFacility from "./hooks/useFacility";

const FacilityDetailView = (): ReactElement => {
  const {
    facilities,
    currentFacility,
    isError,
    isLoading,
    isReady,
    reload,
    isValidating,
    setCurrentFacility,
    formFacility,
    inquiry,
    loadingForm
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
        title: "Muat Ulang",
        onClick: (): void => reload(),
        color: "inherit",
        startIcon: <Cached />,
      },
    ];
  }, [reload]);

  console.log("facilities ===>", facilities);



  return (
    <>
      <Suspense>
        <Section
          title="Detail Fasilitas"
          description="Kelola fasilitas properti Anda"
          actionButton={<ActionButton buttons={actionButtons} />}
        >
          <DetailViewFacility facility={facilities} />
        </Section>
      </Suspense>
    </>
  );
};

export default FacilityDetailView;
