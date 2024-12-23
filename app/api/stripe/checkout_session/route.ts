import { BASE_URL } from "@/lib/config";
import { stripe } from "@/lib/stripe";
import { redirect, RedirectType } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1QYXvtSE4j7cWiABJb4zywlj",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${BASE_URL}/subscription/?success=true`,
      cancel_url: `${BASE_URL}/subscription/?canceled=true`,
    });

    if (!session.url) {
      throw new Error("Cannot checkout");
    }

    return Response.redirect(session.url,303)
  } catch (err: any) {

    console.log(err);
    return new Response(
      JSON.stringify({
        message: err.message,
      }),
      {
        status: err.statusCode || 500,
      }
    );
  }
}
