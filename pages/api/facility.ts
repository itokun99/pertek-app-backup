import facilityController from '../../src/backend/controllers/facility';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(facilityController);
