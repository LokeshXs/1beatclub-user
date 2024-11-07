

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
            <Image src="/images/usecase1.svg" alt="" width={400} height={400} className=" absolute top-0 right-0 opacity-70" />
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
        <Image src="/images/usecase2.svg" alt="" width={400} height={400} className=" absolute top-0 right-0 opacity-70" />
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
        <Image src="/images/usecase3.svg" alt="" width={400} height={400} className=" absolute top-0 right-0 opacity-70" />
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
        <Image src="/images/usecase4.svg" alt="" width={400} height={400} className=" absolute top-0 right-0 opacity-70" />
    </div>
      ),
    },
  ];
  

export default function UseCasesBentoGrid (){


    return (
    <section className=" bg-secondary" >

        <div className=" container mx-auto pt-20 space-y-6 ">

            <div className=" flex flex-col items-center gap-2">
            <h2 className=" text-4xl font-semibold text-secondary-foreground">Where Vibes Meet Votes</h2>
            <p className=" text-lg text-secondary-foreground/80 italic">From parties to study sessions, see how voting music transforms any gathering</p>
            </div>

            <BentoGrid>
          {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
        </BentoGrid>
            </div>
    </section>
      );

    }


