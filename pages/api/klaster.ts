import { withSessionRoute } from "../../src/lib/withSession";
import clusterController from "../../src/backend/controllers/klaster";

export default withSessionRoute(clusterController);

