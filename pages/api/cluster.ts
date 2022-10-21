import { withSessionRoute } from '../../src/lib/withSession';
import clusterController from '../../src/backend/controllers/cluster';

export default withSessionRoute(clusterController);
