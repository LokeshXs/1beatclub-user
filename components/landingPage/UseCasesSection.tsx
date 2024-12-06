

import { PartyPopper,Dumbbell,BusFront,Users } from "lucide-react";
import Image from "next/image";
import { BentoCard, BentoGrid } from "../common/BentoGrid";

const features = [
    {
      Icon: PartyPopper,
      name: "House Parties and Gatherings",
      description: "Let your guests take control of the playlist, keeping the party vibes high all night.",
      href: "/signin",
      cta: "Try Now",
      className: "col-span-3 lg:col-span-1 bg-primary",
      background: (
        <div className=" relative ">
            <Image src="/images/usecase1.svg" alt="" width={400} height={400} className=" absolute top-0 right-0 opacity-70 max-sm:w-72 group-hover:scale-90 group-hover:-translate-y-4 transition-all duration-300 " />
        </div>
      ),
    },
    {
      Icon: Dumbbell,
      name: "Gyms and Fitness Studios",
      description: "Fuel the workout with songs that everyone finds motivating and energizing.",
      href: "/signin",
      cta: "Try Now",
      className: "col-span-3 lg:col-span-2 bg-terniary",
      background: (
        <div className=" relative ">
        <Image src="/images/usecase2.svg" alt="" width={400} height={400} className="  absolute top-0 right-0 opacity-70 max-sm:w-64 group-hover:scale-90 group-hover:-translate-y-4 transition-all duration-300" />
    </div>
      ),
    },
    {
      Icon: BusFront,
      name: "Road Trips and Long Drives",
      description: "Turn long drives into a group journey with tunes chosen by everyone on board.",
      href: "/signin",
      cta: "Try Now",
      className: "col-span-3 lg:col-span-2  bg-primary",
      background: (
        <div className=" relative ">
        <Image src="/images/usecase3.svg" alt="" width={400} height={400} className="  absolute top-0 right-0 opacity-70 max-sm:w-72 group-hover:scale-90 group-hover:-translate-y-4 transition-all duration-300" />
    </div>
      ),
    },
    {
      Icon: Users,
      name: "Study Groups and Work Sessions",
      description: "Stay focused together with a playlist voted by the group to boost productivity.",
      className: "col-span-3 lg:col-span-1 bg-primary",
      href: "/signin",
      cta: "Try Now",
      background: (
        <div className=" relative ">
        <Image src="/images/usecase4.svg" alt="" width={400} height={400} className=" absolute top-0 right-0 opacity-70 max-sm:w-72 group-hover:scale-90 group-hover:-translate-y-4 transition-all duration-300" />
    </div>
      ),
    },
  ];
  

export default function UseCasesBentoGrid (){


    return (
    <section className=" bg-secondary relative" >

        <div className=" container mx-auto pb-52  max-md:pb-24 px-6 max-sm:px-2 space-y-6 ">

            <div className=" flex flex-col items-center gap-2">
            <h2 className=" text-4xl max-sm:text-2xl text-center font-semibold text-secondary-foreground">Where Vibes Meet Votes</h2>
            <p className=" text-lg text-secondary-foreground/80 italic text-center max-sm:text-sm">From parties to study sessions, see how voting music transforms any gathering</p>
            </div>

            <BentoGrid>
          {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
        </BentoGrid>
            </div>

            <div className="custom-shape-divider-bottom-1733517199 ">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
      );

    }


