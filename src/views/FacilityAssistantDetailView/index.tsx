import ActionButton from "@components/buttons/ActionButton";
import { MyAnimatedButtonProps } from "@components/buttons/AnimatedButton";
import { TabItem } from "@components/TabBar";
import Section from "@components/views/Section";
import Cached from "@mui/icons-material/Cached";
import React, { ReactElement, Suspense, useMemo } from "react";
import Detail from "./components/Detail";
import useAssistantDetail from "./hooks/useAssitantDetail";

const FacilityDetailView = (): ReactElement => {
  const { assistant, isError, isLoading, isReady, isValidating, reload } = useAssistantDetail();

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

  return (
    <>
      <Suspense>
        <Section
          title="Detail Assistant"
          description="Detai data assistant"
          actionButton={<ActionButton buttons={actionButtons} />}
        >
          {assistant && <Detail assistant={assistant} />}
        </Section>
      </Suspense>
    </>
  );
};

export default FacilityDetailView;
