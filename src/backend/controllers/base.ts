import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { methodNotAlowed } from '../../lib/apiAuthHelpers';

type ControllerHanlderType = <T = any>(req: NextApiRequest, res: NextApiResponse<T>) => void;

interface ICreateControllerHandlers {
  get?: ControllerHanlderType;
  post?: ControllerHanlderType;
  put?: ControllerHanlderType;
  delete?: ControllerHanlderType;
}

export function createController({ get, post, put, delete: deleteHandler }: ICreateControllerHandlers): NextApiHandler {
  return function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET' && typeof get === 'function') return get(req, res);
    if (req.method === 'POST' && typeof post === 'function') return post(req, res);
    if (req.method === 'PUT' && typeof put === 'function') return put(req, res);
    if (req.method === 'DELETE' && typeof deleteHandler === 'function') return deleteHandler(req, res);
    return methodNotAlowed(res);
  };
}
