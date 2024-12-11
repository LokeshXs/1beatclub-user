import { NextRequest, NextResponse } from "next/server";

export default function CSPProtection( res: NextResponse) {
  // 'self' allows embedding only in same origin
  const cspHeader = `
    frame-ancestors 'self';
`;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  res.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

  return res;
}
