import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/tenant";

export default withSessionRoute(controller);

