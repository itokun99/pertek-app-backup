import { NextApiRequest, NextApiResponse } from 'next';
import { isInvalidSession, unauthorized } from '../../src/lib/apiAuthHelpers';
import { createCSV } from '../../src/lib/csvParser';
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   if (isInvalidSession(req)) {
  //     return unauthorized(res);
  //   }

  if (!req.query.model) {
    return res.status(403).json({ message: 'Invalid Request Format' });
  }

  if (req.method === 'GET') {
    const modelName = req.query.model.toString().toLocaleLowerCase();

    const modelMap = getModel(modelName);

    if (!modelMap) {
      return res.status(404).json({ message: `${modelName} template model not found` });
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${req.query.model.toString().toLocaleLowerCase()}_template.csv`
    );

    const dummyRows = modelMap.map((name) => `data col ${name}`);

    return res.send(createCSV(modelMap, [dummyRows]));
  }
}

function getModel(name: string) {
  const model = {
    tenant: ['first_name', 'last_name', 'phone_number'],
  } as { [key: string]: string[] };

  return model[name];
}
