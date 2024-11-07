import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const url = new URL(req.url);

    const searchParams = url.searchParams;
    console.log(searchParams.get("searchBy"));

    const searchBy = searchParams.get("searchBy");
    var searchedUsers = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchBy || "",
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchBy || "",
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    searchedUsers = searchedUsers.filter(
      (value) => value.id !== session?.user.id
    );

    return Response.json({
      data: searchedUsers,
    });
  } catch (err) {
    return Response.json({
      data: [],
    });
  }
}
