import { withSessionRoute } from '../../src/lib/withSession';
import unitTypeController from '../../src/backend/controllers/unit-type';

export default withSessionRoute(unitTypeController);
