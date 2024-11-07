import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  const { searchParams } = new URL(request.url);

  const clubid = searchParams.get("clubid");
  if (!clubid) {
    throw new Error("No club id found");
  }

  const allListedSongs = await prisma.musicClub.findUnique({
    where: {
      id: clubid,
    },
    select: {
      songs: {
        select: {
          id: true,
          songTitle: true,
          link: true,
          thumbnail: true,
          highResThumbnail: true,
          videoId: true,
          votes: {
            select: {
              songId: true,
              userId: true,
            },
          },
        },
      },
    },
  });



  return Response.json({
    data: allListedSongs?.songs || [],
  });
}
