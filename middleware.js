import { NextResponse } from 'next/server';

export async function middleware(request) {
  const sessionToken = request.cookies.get('next-auth.session-token');

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


}

export const config = {
  matcher: '/home/:path*',
};