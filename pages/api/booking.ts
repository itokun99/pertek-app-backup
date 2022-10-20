import bookingController from '../../src/backend/controllers/booking';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(bookingController);
