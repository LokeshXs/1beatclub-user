"use client";

import React,{useEffect,useRef} from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: JSX.Element;
  delay?:number;
}

export default function RevealLeft({ children,delay=0.2 }: Props) {

    const ref = useRef(null);
    const isInView = useInView(ref,{once:true});
    const mainControls = useAnimation();

    useEffect(()=>{

        if(isInView){
                mainControls.start("visible")
        }
    },[isInView]);


  return (
    <div style={{ position: "relative" }} ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5 ,delay:delay}}
      >
        {children}
      </motion.div>
    </div>
  );
}