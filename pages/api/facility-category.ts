import facilityCategoryController from "@backend/controllers/facility-category";
import { withSessionRoute } from "@lib/withSession";

export default withSessionRoute(facilityCategoryController);
