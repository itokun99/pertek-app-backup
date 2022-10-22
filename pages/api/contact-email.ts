import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/contact-email";

export default withSessionRoute(controller);

