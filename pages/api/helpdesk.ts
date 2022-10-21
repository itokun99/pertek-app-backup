import helpdeskController from '../../src/backend/controllers/helpdesk';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(helpdeskController);
