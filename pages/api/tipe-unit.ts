import { withSessionRoute } from "../../src/lib/withSession";
import controller from "../../src/backend/controllers/tipe-unit";

export default withSessionRoute(controller);

