import { ReactElement } from "react";
import dynamic from "next/dynamic";
import ProtectedPage from "@template/ProtectedPage";

const VendorView = dynamic(() => import("@views/VendorView"), {
  ssr: false,
});

const VendorPage = () => {
  return <VendorView />;
};

VendorPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default VendorPage;
