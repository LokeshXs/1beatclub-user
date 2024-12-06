import { INSTAGRAM_SOCIAL, LINKED_IN, TWITTER_SOCIAL } from "@/lib/data";
import { IconBrandInstagram, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";


export default function Footer(){

    return (
        <footer  className=" pt-20 max-md:pt-12 max-sm:pt-4  bg-secondary">
            <div className=" container mx-auto p-12 max-sm:p-4 flex max-md:flex-col gap-12 max-sm:gap-6 justify-between">


                    <div className=" flex flex-col items-start gap-2 ">
                   <Link href="/">
                   <Image src="/logo/logo-white.svg" alt="Logo" width={340} height={340} className=" max-md:w-[180px] " />
                   </Link>

                  
                    </div>

                    <div className=" text-primary/80 text-lg max-sm:text-base flex max-sm:flex-col gap-12 max-sm:gap-6  ">
                        <div className=" flex flex-col gap-4 max-sm:gap-2 ">
                            <p className=" font-semibold text-primary ">PRODUCT</p>
                            <ul className=" space-y-2">
                                <li className=" sm:hover:text-primary ">
                                    <Link href="/#howitworks" className=" ">
                                    How it works
                                    </Link>
                                </li>
                                <li  className=" hover:text-primary ">
                                <Link href="/#contactus" className=" ">
                                Contact Us
                                    </Link>
                                  
                                </li>
                            </ul>
                        </div>

                        <div className=" flex flex-col gap-4 max-sm:gap-2  ">
                            <p className=" font-semibold text-primary ">LEGAL</p>
                            <ul className=" space-y-2">
                                <li className=" hover:text-primary ">
                                    <Link href="/privacy-policy" className=" ">
                                   Privacy
                                    </Link>
                                </li>
                             
                            </ul>
                        </div>
                        <div className=" flex flex-col gap-4 max-sm:gap-2  ">
                            <p className=" font-semibold text-primary ">SOCIAL</p>
                            <ul className=" space-y-2">
                                <li className=" sm:hover:text-primary ">
                                    <Link target="_blank" href={TWITTER_SOCIAL} className=" flex items-center gap-1 ">
                                  <IconBrandX/> <p>Twitter</p>
                                    </Link>
                                </li>
                                <li  className=" sm:hover:text-primary ">
                                <Link target="_blank" href={INSTAGRAM_SOCIAL} className=" flex items-center gap-1 ">
                              <IconBrandInstagram/> <p> Instagram</p>
                                    </Link>
                                  
                                </li>
                                <li  className=" hover:text-primary ">
                                <Link target="_blank" href={LINKED_IN} className=" flex items-center gap-1 ">
                              <IconBrandLinkedin/> <p>Linked In</p>
                                    </Link>
                                  
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>

            <div className=" p-6 max-sm:p-4 bg-terniary rounded-t-2xl">
               <div className=" container mx-auto flex max-sm:flex-col max-sm:items-center justify-between gap-6 max-sm:gap-2 items-center">
               <p className=" text-white text-center max-sm:text-sm">
                    Product By <Link target="_blank" href="https://ashwacreations.com/" className=" underline">Ashwa Creations</Link>
                </p>

                <p className=" text-white text-center max-sm:text-sm ">Copyright © {(new Date()).getFullYear()} 1BeatClub. All Rights Reserved.</p>
               </div>
            </div>
        </footer>
    )
}