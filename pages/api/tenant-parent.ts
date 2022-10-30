import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/tenant-parent";

export default withSessionRoute(controller);

