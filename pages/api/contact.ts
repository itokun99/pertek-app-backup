import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/contact";

export default withSessionRoute(controller);

