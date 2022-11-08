import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/vendor";

export default withSessionRoute(controller);
