import { withSessionRoute } from "../../src/lib/withSession";
import controller from "../../src/backend/controllers/unit";

export default withSessionRoute(controller);

