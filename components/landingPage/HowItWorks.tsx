import { STEPS_ON_HOW_IT_WORKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import RevealUp from "../animation/RevealUp";
import RevealLeft from "../animation/RevealLeft";
import RevealRight from "../animation/RevealRight";

export default function HowItWorksSection() {
  return (
    <section
      id="howitworks"
      className=" relative pt-20 max-md:pt-12 max-sm:pt-6"
    >
      <div className=" container mx-auto space-y-12 max-sm:space-y-6 px-4 max-sm:px-2">
        <RevealUp>
          <div className=" flex flex-col items-center gap-2">
            <h2 className=" text-4xl max-sm:text-2xl text-center font-semibold text-secondary">
              How <span className=" text-terniary">it</span> works
            </h2>
            <p className=" text-lg text-secondary/80 italic text-center max-sm:text-sm">
              Discover our simple, step-by-step process designed to help you get
              started effortlessly
            </p>
          </div>
        </RevealUp>

        <div className=" text-primary-foreground space-y-12">
          {STEPS_ON_HOW_IT_WORKS.map((value, index) => (
            <div
              key={`step-${index}`}
              className={cn(
                " flex max-sm:flex-col max-sm:items-start justify-between gap-12 max-sm:gap-4 items-center",
                {
                  "flex-row-reverse": value.id % 2 === 0,
                }
              )}
            >
              <RevealLeft >
                <div className=" space-y-4 max-sm:space-y-2 ">
                  <value.icon className=" w-12 h-12 max-lg:w-8 max-lg:h-8 text-terniary" />
                  <h3 className=" pl-4 text-3xl font-bold max-w-xl max-lg:text-2xl max-sm:font-medium max-sm:text-sm  ">
                    {value.title}
                  </h3>
                </div>
              </RevealLeft>
              <RevealRight >
                <div className=" p-1 max-sm:p-[2px] border-2 border-primary-foreground rounded-2xl max-sm:rounded-xl bg-primary-foreground shadow-lg">
                  <Image
                    src={value.imgUrl}
                    alt={value.title}
                    width={800}
                    height={800}
                    className=" rounded-xl max-sm:rounded-lg "
                  />
                </div>
              </RevealRight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
