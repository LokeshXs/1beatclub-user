/**
 * An array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string;}
 */

export const PUBLIC_ROUTES = ["/","/privacy-policy"];

export const PUBLIC_DYNAMIC_ROUTES="/join-club"


/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users to /chat
 * @type {string[]}
 */

export const AUTH_ROUTES=["/signup","/signin","/auth/error","/forgot-password","/reset-password","/verify-account"];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */



export const API_AUTH_PREFIX = "/api/auth";


/**
 * The default redirect path after loggin in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard"


/**
 * The routes accessible to premium members
 * @type {string[]}
 */
export const PREMIUM_MEMEBERS_ROUTES = ["/dashboard/myclubs"]