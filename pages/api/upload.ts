import uploadController from '@backend/controllers/upload';
import { withSessionRoute } from '@lib/withSession';

export default withSessionRoute(uploadController);
