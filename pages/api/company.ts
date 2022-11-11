import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/company";

export default withSessionRoute(controller);
