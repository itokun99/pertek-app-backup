import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/role";

export default withSessionRoute(controller);

