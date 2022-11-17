import { withSessionRoute } from "../../src/lib/withSession";
import unitByContactID from "../../src/backend/controllers/unit-by-contact-id";

export default withSessionRoute(unitByContactID);
