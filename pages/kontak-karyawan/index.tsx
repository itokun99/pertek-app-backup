import { ReactElement } from "react";
import dynamic from "next/dynamic";
import ProtectedPage from "@template/ProtectedPage";

const ContactStaffView = dynamic(() => import("@views/ContactStaffView"), {
  ssr: false,
});

const ContactStaffPage = () => {
  return <ContactStaffView />;
};

ContactStaffPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ContactStaffPage;
