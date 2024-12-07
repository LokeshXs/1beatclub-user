import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PREMIUM_MEMEBERS_ROUTES,
  PUBLIC_ROUTES,
} from "./lib/routes";
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./lib/config";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getToken } from "next-auth/jwt";

export const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const session = await auth();

  // todo:DEVLOPMENT ONLY
  // const token = await getToken({
  //   req: req,
  //   secret: process.env.AUTH_SECRET || "",
  //   salt:
  //     process.env.NODE_ENV === "production"
  //       ? "__Secure-authjs.session-token"
  //       : "authjs.session-token",

  // });

  // todo:PRODUCTION ONLY

  const token = await getToken({
    req: req,
    secret: process.env.AUTH_SECRET || "",
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
    cookieName: "__Secure-authjs.session-token",
  });

  const isLoggedIn = session === null ? false : true;
  const isPremiumMember = token?.isPremiumMember as boolean;



  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isPremiumMemberRoute = PREMIUM_MEMEBERS_ROUTES.includes(
    nextUrl.pathname
  );

  if (isApiAuthRoute) {

    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(`${BASE_URL}${DEFAULT_LOGIN_REDIRECT}`);
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {


    return NextResponse.redirect(`${BASE_URL}/signin`);
  }

  // todo: May be in future I want to add premium feature
  // if (isPremiumMemberRoute && !isPremiumMember) {
  //   return NextResponse.redirect(`${BASE_URL}/dashboard`);
  // }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
