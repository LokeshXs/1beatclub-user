"use client";

import Image from "next/image";
import Lottie from "react-lottie";
import animationData from "@/public/lottie/hero.json";
import songWaveAnimationData from "@/public/lottie/songWave.json";
import { AnimatedList } from "../ui/AnimatedList";
import { IconArrowNarrowUp } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const DISPLAY_SONGS_INFO = [
  {
    id: "hs-song1",
    imgPath: "/images/hs-song1.webp",
    title: "Ghungroo",
    votes: "50",
  },
  {
    id: "hs-song2",
    imgPath: "/images/hs-song2.webp",
    title: "Russian Bandana",
    votes: "48",
  },
  {
    id: "hs-song3",
    imgPath: "/images/hs-song3.webp",
    title: "Jaane Jaana",
    votes: "45",
  },
  {
    id: "hs-song4",
    imgPath: "/images/hs-song4.webp",
    title: "AAm Jaahe Munde",
    votes: "42",
  },
  {
    id: "hs-song5",
    imgPath: "/images/hs-song5.webp",
    title: "Forever",
    votes: "38",
  },
  {
    id: "hs-song6",
    imgPath: "/images/hs-song6.webp",
    title: "Attention",
    votes: "32",
  },
  {
    id: "hs-song7",
    imgPath: "/images/hs-song7.webp",
    title: "Born To Shine",
    votes: "30",
  },
  {
    id: "hs-song8",
    imgPath: "/images/hs-song8.webp",
    title: "Animal",
    votes: "26",
  },
  {
    id: "hs-song9",
    imgPath: "/images/hs-song9.webp",
    title: "Millionaire",
    votes: "26",
  },
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const songWaveDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData: songWaveAnimationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function HeroSection() {
  return (
    <section className=" relative min-h-screen    mx-auto flex max-lg:flex-col max-md:flex-col  justify-center gap-12 max-xl:gap-6 items-center py-24 max-md:py-12 px-12 max-xl:px-6 max-sm:px-2 ">
      <div className="flex flex-col  items-start max-lg:items-center z-10">
        <h1 className=" text-6xl max-sm:text-4xl text-primary-foreground max-w-lg max-lg:max-w-2xl text-pretty leading-tight font-bold max-lg:text-center">
          Let the Crowd Pick the Soundtrack
        </h1>

        <div className="w-96 max-sm:w-80">
          {" "}
          <Lottie
            options={songWaveDefaultOptions}
            isClickToPauseDisabled={true}
          />
        </div>
        <p className=" italic text-lg max-sm:text-base text-primary-foreground/90 max-lg:text-center max-w-lg ">
          Vote for your favorite tunes and watch them climb to the top of the
          playlist.
        </p>

        <Button
          asChild
          className=" mt-6  text-terniary-foreground bg-terniary hover:bg-terniary/90 text-lg max-sm:text-sm py-5 flex items-center gap-2 group"
        >
          <Link href="/signup">
            <p>Get Started For Free</p>
            <ArrowRight className=" group-hover:translate-x-1 transition-all duration-300 max-sm:w-4 max-sm:group-hover:translate-x-0" />
          </Link>
        </Button>

        <a href="https://www.producthunt.com/posts/1beatclub?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-1beatclub" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=683983&theme=light" alt="1BeatClub - 1BeatClub&#0032;–&#0032;Where&#0032;everyone’s&#0032;vibe&#0032;becomes&#0032;the&#0032;playlist&#0033; | Product Hunt" className=" mt-4"  width="240" height="54" /></a>
      </div>

      <div className=" w-[400px] max-2xl:w-[360px] max-md:w-[300px] max-sm:w-[200px] ">
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
      </div>
      <div className="relative z-10 flex h-[400px] max-sm:h-[300px] w-[500px] max-sm:w-[400px] max-[430px]:w-full flex-col p-6 max-sm:px-2 overflow-hidden rounded-lg  bg-secondary/20  ">
        <AnimatedList>
          {DISPLAY_SONGS_INFO.reverse().map((value, index) => (
            <SongTile
              key={value.id}
              thumbnailPath={value.imgPath}
              title={value.title}
              votes={value.votes}
            />
          ))}
        </AnimatedList>
      </div>

      <div className="custom-shape-divider-bottom-1730463123">
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

const SongTile = ({
  thumbnailPath,
  title,
  votes,
}: {
  thumbnailPath: string;
  title: string;
  votes: string;
}) => {
  return (
    <div className=" w-full flex justify-between gap-2 items-center p-4 bg-primary/50  rounded-xl">
      <div className=" flex items-center gap-4">
        <Image
          src={thumbnailPath}
          alt="songthumbnail"
          width={80}
          height={80}
          className=" rounded-lg max-sm:w-12"
        />
        <p className="max-sm:text-xs">{title}</p>
      </div>
      <Button className=" bg-primary px-8 max-sm:px-4 rounded-full flex items-center gap-1">
        <IconArrowNarrowUp className=" max-sm:w-4" />
        <p className=" max-sm:text-xs">{votes}</p>
      </Button>
    </div>
  );
};
