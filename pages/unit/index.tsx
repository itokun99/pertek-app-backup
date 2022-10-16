import { Suspense, ReactElement } from 'react';
import dynamic from "next/dynamic";
import ProtectedPage from "../../src/template/ProtectedPage";


const UnitView = dynamic(() => import("../../src/views/UnitView"), {
  ssr: false
});

const UnitTypeView = dynamic(() => import("../../src/views/UnitTypeView"), {
  ssr: false
});


const UnitIndex = () => {
  return (
    <>
      <UnitView />
      <UnitTypeView />
    </>
  )
}

UnitIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default UnitIndex;
