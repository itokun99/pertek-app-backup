import { Suspense, ReactElement } from "react";
import dynamic from "next/dynamic";
import ProtectedPage from "../../src/template/ProtectedPage";

const UnitView = dynamic(() => import("../../src/views/UnitView"), {
  ssr: false,
});

const UnitIndex = () => {
  return <UnitView />;
};

UnitIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default UnitIndex;
