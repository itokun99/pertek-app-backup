import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.match(/_next|healthcheck|robot*|manifest*|static*|login|sw.*|workbox-*/)) {
    // get client IP address from middleware
    const ip = req.headers.get('x-forwarded-for') || req.ip;

    if (req.cookies.get('session') === undefined) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}
