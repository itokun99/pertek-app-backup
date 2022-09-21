import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.match(/_next|login|sw.*|workbox-*/)) {
    if (req.cookies.get('session') === undefined) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}
