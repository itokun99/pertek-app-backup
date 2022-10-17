import { Suspense, ReactElement } from 'react';
import dynamic from "next/dynamic";
import ProtectedPage from "../../src/template/ProtectedPage";

const ClusterView = dynamic(() => import("../../src/views/ClusterView"), {
  ssr: false,
});

const ClusterIndex = () => {
  return (
    <ClusterView />
  )
}

ClusterIndex.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ClusterIndex;
