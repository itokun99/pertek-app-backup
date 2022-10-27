import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/role-group";

export default withSessionRoute(controller);

