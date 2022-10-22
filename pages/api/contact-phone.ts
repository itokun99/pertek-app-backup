import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/contact-phone";

export default withSessionRoute(controller);

