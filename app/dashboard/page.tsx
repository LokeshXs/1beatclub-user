"use client";

import React, { useEffect, useState } from "react";

import AddSongForm from "@/components/dashboard/AddSongForm";
import SongsListed from "@/components/dashboard/SongsListed";
import SongPlaying from "@/components/dashboard/SongPlaying";
import { useContext } from "react";
import { WebSocketClientContext } from "@/context/WebSocketClientProvider";
import Loader from "@/components/ui/loader/loader";





export default  function SidebarDemo() {

const {wsClient} = useContext(WebSocketClientContext);
const [connecting,setConnecting]= useState(!wsClient);

if(connecting && !wsClient){


  return (
    <div className=" w-full h-full  flex-1 p-6 max-sm:px-2 flex justify-center items-center">
     <div className="  flex flex-col gap-8 items-center">
     <Loader />
     <p>Connecting...</p>
     </div>
    </div>
  )

  
}

if(!connecting && !wsClient){
  return (
    <div className="  flex-1 p-6 max-sm:px-2 flex justify-center items-center">
   <p>Application is not working</p>
  </div>
  )
}


  return (
    <div className=" h-full  flex-1 p-6 max-sm:px-2 grid grid-cols-2 max-sm:place-items-center gap-12  max-sm:gap-10 max-xl:grid-cols-1 max-xl:overflow-y-scroll">
  
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
