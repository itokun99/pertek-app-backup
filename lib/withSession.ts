import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { IronSessionOptions } from 'iron-session';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next';

export const sessionOptions = {
  password: process.env.COOKIE_PASS,
  cookieName: process.env.COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
} as IronSessionOptions;

export function withSessionRoute(handler: NextApiHandler) {
  console.log(sessionOptions);
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      token: string;
      profile: any;
    };
  }
}
