import ProtectedPage from "@template/ProtectedPage";
import dynamic from "next/dynamic";
import { ReactElement, Suspense } from "react";

const BookingView = dynamic(() => import("@views/BookingView"), {
  ssr: false,
  suspense: false,
});

const FacilityBookingPage = () => {
  return (
    <Suspense>
      <BookingView />
    </Suspense>
  );
};

FacilityBookingPage.getLayout = (page: ReactElement) => <ProtectedPage>{page}</ProtectedPage>;

export default FacilityBookingPage;
