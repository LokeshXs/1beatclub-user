import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

import CSPProtection from "./middleware/CSPProtection";
import authorizationHandler from "./middleware/AuthMiddleware";


export const { auth } = NextAuth(authConfig);

export default async function middleware(req: NextRequest) {
  let response = NextResponse.next();
  const session = await auth();


  1. // ATTACHING Content Security Policy Headers to response to guard against content related security threats
  response = CSPProtection(response);


 2.  //  Handling route protections
  const redirectUrl = await authorizationHandler(req, session);

  if (redirectUrl) {
    return NextResponse.redirect(redirectUrl);
  }

  return response;
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
