import { withSessionRoute } from "@lib/withSession";
import controller from "@backend/controllers/contact-staff";

export default withSessionRoute(controller);
