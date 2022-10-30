import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/template";

export default withSessionRoute(controller);

