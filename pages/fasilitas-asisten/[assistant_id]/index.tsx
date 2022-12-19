import ProtectedPage from "@template/ProtectedPage";
import dynamic from "next/dynamic";
import { ReactElement } from "react";

const AssistantDetailView = dynamic(() => import("@views/FacilityAssistantDetailView"), {
  ssr: false,
  suspense: false,
});

const AssistantDetailPage = () => <AssistantDetailView />;

AssistantDetailPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default AssistantDetailPage;
