import propertyController from '../../src/backend/controllers/property';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(propertyController);
