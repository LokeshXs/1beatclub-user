import axios from "axios";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const searchParams = url.searchParams;
    const searchBy = searchParams.get("searchBy");

    if (!searchBy) {
      throw new Error("Please search");
    }

    const params = {
      part: "snippet",
      q: searchBy,
      type: "video",
      safeSearch: "strict",
      key: process.env.GOOGLE_API_KEY,
    };

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: params,
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = response.data;

    // console.log(data);

    const videosData = data.items.map((value: any) => {
      const modifiedObj = {
        title: value.snippet.title,
        videoId: value.id.videoId,
        thumbnail:
          value.snippet.thumbnails.medium.url ||
          value.snippet.thumbnails.default.url,
        channelTitle: value.snippet.channelTitle,
      };

      return modifiedObj;
    });

    console.log(videosData);

    return Response.json({
      status: "success",
      message: "Videos Fetched Successfully",
      results: videosData,
    });
  } catch (err: any) {
    return Response.json({
      status: "error",
      message: err.message || "Something went wrong",
      results: [],
    });
  }
}
