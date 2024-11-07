import { auth } from "@/auth";
import userInstance from "@/services/User";

export async function GET() {
  const session = await auth();

  try {
    const invites = await userInstance.getInvites(session?.user.id || "");

    if (!invites) {
      throw new Error("Invalid session");
    }

    return Response.json({
      status: "success",
      message: "Invites fetched successfully",
      invites: invites.receivedInvites,
    });
  } catch (err: any) {
    return Response.json({
      status: "error",
      message: err.message || "something went wrong",
    });
  }
}
