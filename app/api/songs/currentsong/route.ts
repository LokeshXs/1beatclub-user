import clubInstance from "@/services/Club";

export async function PATCH(req: Request) {
  try {
    const res = await req.json();

    const songId = res?.songId;
    const clubId = res?.clubId;

    if (!songId || !clubId) {
      throw new Error("No songId or clubId");
    }

    const response = await clubInstance.updateCurrentSong(songId, clubId);

    if (response.status === "error") {
      throw new Error();
    }

    return Response.json({
      status: "success",
      message: "current song is updated",
    });
  } catch (err: any) {
    return Response.json({
      status: "error",
      message: err.message || "something went wrong!",
    });
  }
}
