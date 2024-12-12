import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PREMIUM_MEMEBERS_ROUTES,
  PUBLIC_DYNAMIC_ROUTES,
  PUBLIC_ROUTES,
} from "@/lib/routes";
import { BASE_URL } from "@/lib/config";

export default async function authorizationHandler(
  req: NextRequest,
  session: Session | null
) {
  const { nextUrl } = req;

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

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname) || nextUrl.pathname.startsWith(PUBLIC_DYNAMIC_ROUTES);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isPremiumMemberRoute = PREMIUM_MEMEBERS_ROUTES.includes(
    nextUrl.pathname
  );

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return (`${BASE_URL}${DEFAULT_LOGIN_REDIRECT}`);
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return (`${BASE_URL}/signin`);
  }

  return;

  // todo: May be in future I want to add premium feature
  // if (isPremiumMemberRoute && !isPremiumMember) {
  //   return NextResponse.redirect(`${BASE_URL}/dashboard`);
  // }
}
