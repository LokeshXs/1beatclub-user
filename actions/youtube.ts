"use server";

import axios from "axios";
import { z } from "zod";
import { addSongFormSchema } from "@/schema/schema";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// This function gets a youtube url and returns back the info of that video like thumbnail,title

export async function getVideoInfo(
  value: z.infer<typeof addSongFormSchema>,
  clubId: string
) {
  try {
    const session = await auth();

    if (!session?.user.id) {
      throw new Error("something went wrong");
    }

    if (!clubId) {
      return {
        status: "error",
        message: "Not Club id found, Please refresh!",
      };
    }
    const validateUrl = addSongFormSchema.safeParse(value);

    if (!validateUrl.success) {
      return {
        status: "error",
        message: "Enter a youtube video url",
      };
    }

    const { url: link } = validateUrl.data;

    const url = new URL(link);
    const params = new URLSearchParams(url.search);

    let videoId: string | null;

    if (params.get("v")) {
      videoId = params.get("v");
    } else {
      videoId = url.pathname.substring(1);
    }

    if (!videoId) {
      return {
        status: "error",
        message: "Enter a youtube video url",
      };
    }

    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos`,
      {
        params: { 
          part: "snippet",
          id: videoId,
          key: process.env.GOOGLE_API_KEY,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = response.data;
    const videoDetails = data.items[0].snippet;

    const highResoultionThumbnail =
      videoDetails.thumbnails?.maxres?.url ||
      videoDetails.thumbnails?.standard?.url ||
      videoDetails.thumbnails?.high?.url ||
      videoDetails.thumbnails?.medium?.url;

    const newSong = await prisma.listedSongs.create({
      data: {
        user_id: session.user.id,
        songTitle: videoDetails.title,
        thumbnail: videoDetails.thumbnails.medium.url,
        highResThumbnail: highResoultionThumbnail,
        link: link,
        videoId: videoId,
      },
    });

    await prisma.listedSongs.update({
      where: {
        id: newSong.id,
      },
      data: {
        club: {
          connect: {
            id: clubId,
          },
        },
      },
    });

    return {
      status: "success",
      message: "Video Details Fetched Successfully",
      data: {
        id: newSong.id,
        songTitle: videoDetails.title,
        thumbnail: videoDetails.thumbnails.medium.url,
        videoId: videoId,
        highResThumbnail: highResoultionThumbnail,
        link: link,
        clubId: clubId,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      message: error.message || "Something went wrong, Try Again!",
    };
  }
}

export async function searchYoutubeVideo(searchBy: string) {
  try {
    const params = {
      part: "snippet",
      q: searchBy,
      type: "video",
      safeSearch: "moderate",
      maxResults:5,
      key: process.env.GOOGLE_API_KEY,
    };

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: params,
       headers:{
        Accept:"application/json"
       } 
      }
    );

    const data = response.data;

    // console.log(data);

    const videosData = data.items.map((value:any)=>{
      const modifiedObj = {
        title:value.snippet.title,
        videoId:value.id.videoId,
        thumbnail:value.snippet.thumbnails.medium.url || value.snippet.thumbnails.default.url ,
        channelTitle:value.snippet.channelTitle

      }

      return modifiedObj;
    });

    console.log(videosData);


    return {
      "status":"success",
      "message":"Videos Fetched Successfully",
      results:videosData
    }


  } catch (err:any) {
    console.error(err);

    return {
      "status":"error",
      "message":err.message || "Something went wrong"
    }
  }
}
