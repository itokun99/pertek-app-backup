import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  if (req.cookies.get('token')) {
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
}
