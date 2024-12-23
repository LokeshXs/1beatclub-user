import Link from "next/link";
import { PulsatingButton } from "../ui/PulsatingButton";
import RevealUp from "../animation/RevealUp";

export default function ActionSection(){


    return (
        <section  className=" pt-20 max-md:pt-12 max-sm:pt-6 pb-20 max-sm:pb-12   px-2">
        <div className=" container mx-auto p-12 max-sm:p-4 w-[1200px] max-lg:w-full bg-gradient-to-t from-secondary from-60% to-terniary to-100%  rounded-xl flex flex-col gap-6 items-center ">
        
    <div className="flex flex-col gap-4 items-center">
    <RevealUp >

    <h2 className=" text-4xl max-lg:text-3xl max-sm:text-2xl font-bold text-primary text-center">Ready to Transform your Space?</h2>
    </RevealUp>
    <RevealUp delay={0.3}>
    <p className=" text-lg max-md:text-base max-sm:text-sm text-primary/90 text-center">Join Now to to create a collaborative music experiences</p>
    </RevealUp>
    </div>
      <RevealUp delay={0.4}>
      <Link href="/signin">
        <PulsatingButton pulseColor="#d67d1d" className=" bg-terniary text-lg max-md:text-base "> 
                Create Your Music Room Now
            </PulsatingButton>
        </Link>
      </RevealUp>

            <RevealUp delay={0.5}>
            <p className=" text-terniary  text-lg max-md:text-base max-sm:text-sm">No credit card required. Free for forever!</p>
            </RevealUp>
            </div>

           
        </section>
    )
}