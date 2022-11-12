import Section from '@components/views/Section';
import { BookingTableView } from './TableView';

const BookingView = () => {
  return (
    <Section title='Booking Fasilitas' description='Kelola pemesanan fasilitas properti Anda'>
      <BookingTableView />
    </Section>
  );
};

export default BookingView;
