import { NextApiRequest, NextApiResponse } from 'next';

export const buildAuthorization = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const isInvalidSession = (req: NextApiRequest) => req.session.user === undefined;

const createResponse = (res: NextApiResponse, status: number, message: string) => res.status(status).json({ message });

export const unauthorized = (res: NextApiResponse) => createResponse(res, 401, 'Unauthorized Access');
export const methodNotAlowed = (res: NextApiResponse) => createResponse(res, 401, 'Method not allowed');
