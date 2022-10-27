import { Suspense, ReactElement } from "react";
import dynamic from "next/dynamic";
import ProtectedPage from "../../src/template/ProtectedPage";

const ContactView = dynamic(() => import("../../src/views/ContactView"), {
  ssr: false,
});

const ContactPage = () => {
  return <ContactView />;
};

ContactPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default ContactPage;
