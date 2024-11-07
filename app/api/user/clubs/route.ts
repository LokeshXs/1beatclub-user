import { auth } from "@/auth";
import userInstance from "@/services/User";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      throw new Error("user id is required");
    }
    const userClubs = await userInstance.getClubsUserPartOf(session.user.id);

    return Response.json({
      data: userClubs,
    });
  } catch (error) {
    return Response.json({
      data: [],
    });
  }
}
