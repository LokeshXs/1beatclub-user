import userInstance from "@/services/User";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();

  const res = await userInstance.isAPremiumUser(session?.user.id || "");

  return Response.json({
    data: res,
  });
}

export async function PATCH() {
  const session = await auth();

  const res = await userInstance.makeUserPremium(session?.user.id || "");

  // if (res) {
  //   revalidatePath("/dashboard/createclub");
  // }

  return Response.json({
    data: res,
  });
}
