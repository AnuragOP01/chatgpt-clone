import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {

  const token = req.cookies.get('next-auth.session-token'); 

  console.log(token);
  
  if (token && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/chat', req.url));
  }

  if (token && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/chat', req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  if (!token && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/chat' , '/auth' , '/auth/signin', '/auth/register' , '/'], // Apply middleware to /login and /app routes
};
