import facilityAssistantController from '../../src/backend/controllers/facility-assistant';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(facilityAssistantController);
