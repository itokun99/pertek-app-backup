import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const path = req.nextUrl.pathname;

  if (path.match(/\/_next*|\/api\/login*/)) {
    return;
  }

  if (!token) {
    if (path !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  if (path === '/') {
    return NextResponse.rewrite(new URL('/dashboard', req.url));
  }

  if (path === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
}

// export const config = {
//   matcher: [
//     '/',
//     '/login',
//     '/dashboard',
//     '/paket',
//     '/pelaporan',
//     '/pengumuman',
//     '/properti',
//     '/tenant/:path*',
//     '/token',
//     '/token',
//   ],
// };
