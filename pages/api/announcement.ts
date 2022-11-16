import announcementControllers from '../../src/backend/controllers/announcement';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(announcementControllers);
