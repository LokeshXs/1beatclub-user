import { cn } from "@/lib/utils";
import { Marquee } from "../ui/Marquee";
import Image from "next/image";
import { REVIEWS } from "@/lib/data";

const firstRow = REVIEWS.slice(0, REVIEWS.length / 2);
const secondRow = REVIEWS;
const thirdRow = REVIEWS.slice(0, REVIEWS.length / 3);

const ReviewCard = ({
  img,
  name,

  body,
}: {
  img: string;
  name: string;

  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative max-w-80    cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="40"
          height="40"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium  text-primary-foreground">
            {name}
          </figcaption>
         
        </div>
      </div>
      <blockquote className="mt-2 text-sm bg-secondary p-2 text-secondary-foreground rounded-lg">
        {body}
      </blockquote>
    </figure>
  );
};
// What our customers are saying
export default function ReviewsSection() {
  return (
    <section className="container mx-auto space-y-12 max-sm:space-y-6 ">
      <div className=" flex flex-col items-center gap-2">
        <h2 className=" text-4xl max-sm:text-2xl text-center font-semibold text-secondary">
          What our <span className=" text-terniary">Users</span> are saying
        </h2>
        <p className=" text-lg text-secondary/80 italic text-center max-sm:text-sm">
          Hear what our users have to say about their experience.
        </p>
      </div>

      <div className="container mx-auto relative h-[800px] max-md:h-[500px]  flex  items-center justify-center gap-4 overflow-hidden rounded-lg border bg-primary ">
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:40s] max-md:hidden"
        >
          {firstRow.map((review,index) => (
            <ReviewCard key={`first-${index}`} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
          {secondRow.map((review,index) => (
            <ReviewCard  key={`second-${index}`} {...review} />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:30s] max-lg:hidden"
        >
          {thirdRow.map((review,index) => (
            <ReviewCard  key={`third-${index}`} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-primary dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-primary dark:from-background"></div>
      </div>
    </section>
  );
}
