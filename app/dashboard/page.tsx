"use client";

import React, { useEffect, useState } from "react";

import AddSongForm from "@/components/dashboard/AddSongForm";
import SongsListed from "@/components/dashboard/SongsListed";
import SongPlaying from "@/components/dashboard/SongPlaying";


export default  function SidebarDemo() {





  return (
    <div className="  flex-1 p-6 max-sm:px-2 grid grid-cols-2 max-sm:place-items-center gap-12  max-sm:gap-6 max-xl:grid-cols-1 max-xl:overflow-y-scroll">
  
      <div>
        <SongPlaying />
      </div>
     
      <div className="max-xl:h-[600px] max-sm:w-full  overflow-y-auto  row-span-2 bg-secondary/20 rounded-lg ">
        <SongsListed />
      </div>
      <div className=" p-4 w-full max-md:max-w-[600px]   bg-[#d5cec3] flex justify-center items-center rounded-2xl max-xl:row-start-2 ">
        <div className=" flex flex-col  justify-center gap-12 max-sm:gap-4">
          <p className=" max-h-96 text-primary-foreground text-center max-sm:text-sm">
            Paste a Youtube video url to add in list
          </p>

          <AddSongForm />
        </div>
      </div>
    </div>
  );
}
