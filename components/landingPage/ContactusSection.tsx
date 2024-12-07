import {
  IconBrandInstagram,
  IconBrandX,
  IconMailFilled,
  IconPhoneFilled,
} from "@tabler/icons-react";
import ContactUsForm from "./ContactUsForm";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  CONTACT_EMAIL_ID,
  CONTACT_PHONE_NUMBER,
  INSTAGRAM_SOCIAL,
  TWITTER_SOCIAL,
} from "@/lib/data";

export default function ContactUsSection() {
  return (
    <section id="contactus" className=" pt-20 max-md:pt-12 max-sm:pt-6">
      <div className=" container p-6 max-sm:px-2 mx-auto space-y-12 max-sm:space-y-6 ">
        <div className=" flex flex-col items-center gap-4">
        <h1 className=" text-center text-primary-foreground text-4xl max-sm:text-2xl font-bold ">
          Contact <span className=" text-terniary">Us</span>
        </h1>
        <p className=" text-center max-w-2xl mx-auto text-primary-foreground/90 max-sm:text-sm italic">
          If you have any questions or suggestions, please get in touch with us.
          We&apos;re here to help and answer any questions you may have.
        </p>
        </div>

        <div className=" flex max-md:flex-col items-start gap-20 max-lg:gap-6 ">
          <div className=" flex-1 space-y-4  min-w-[300px] max-md:w-full">
          <span className=" flex items-center gap-2 text-2xl max-sm:text-lg font-semibold text-primary-foreground">
                <Separator
                  className="h-8 max-sm:h-6 w-1 rounded-lg bg-terniary"
                  orientation="vertical"
                />
                Get In Touch 
              </span>
            <ContactUsForm />
          </div>

          <div className=" w-[600px] max-md:w-full bg-secondary text-secondary-foreground p-8 max-sm:p-4 rounded-xl space-y-6">
            <div className=" space-y-2">
              <span className=" flex  items-center gap-2 text-4xl max-lg:text-2xl max-sm:text-lg font-semibold ">
                <Separator
                  className="h-8 max-sm:h-6 w-1 rounded-lg bg-terniary"
                  orientation="vertical"
                />
                Contact Information
              </span>
              <span className=" flex flex-wrap items-center gap-4 max-sm:gap-2">
                <IconMailFilled className=" text-terniary w-6 h-6" />{" "}
                <Link
                  href={`mailto:${CONTACT_EMAIL_ID}`}
                  target="_blank"
                  className=" hover:text-terniary hover:underline"
                >
                  {CONTACT_EMAIL_ID}
                </Link>
              </span>
              <span className=" flex flex-wrap items-center gap-4 max-sm:gap-2">
                <IconPhoneFilled className=" text-terniary w-6 h-6" />{" "}
                <Link
                  href={`tel:${CONTACT_PHONE_NUMBER}`}
                  target="_blank"
                  className=" hover:text-terniary hover:underline"
                >
                  +91 9499424869
                </Link>
              </span>
            </div>

            <div className=" space-y-2">
              <span className=" flex items-center gap-2 text-4xl max-lg:text-2xl max-sm:text-lg font-semibold">
                <Separator
                  className="h-8 max-sm:h-6 w-1 rounded-lg bg-terniary"
                  orientation="vertical"
                />
                Dm Us Now
              </span>

              <span className=" flex items-center gap-8 max-sm:gap-4 ">
                <Link
                target="_blank"
                  href={TWITTER_SOCIAL}
                  className="  rounded-full p-2 group sm:hover:bg-terniary transition-all duration-500  "
                >
                  <IconBrandX className=" w-14 h-14 max-lg:w-10 max-xl:h-10 opacity-90 sm:group-hover:-rotate-[360deg] sm:group-hover:opacity-100 transition-all duration-300  " />
                </Link>

                <Link
                target="_blank"
                  href={INSTAGRAM_SOCIAL}
                  className="  rounded-full p-2 group hover:bg-terniary transition-all duration-500  "
                >
                  <IconBrandInstagram className=" w-14 h-14 max-lg:w-10 max-xl:h-10 opacity-90 sm:group-hover:rotate-[360deg] sm:group-hover:opacity-100 transition-all duration-300  " />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
