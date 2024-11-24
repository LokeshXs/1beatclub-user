import { BackgroundBeams } from "@/components/ui/BeamsBackground";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IconLogout2 } from "@tabler/icons-react";
import Link from "next/link";




export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative px-12 max-sm:px-4 min-h-screen w-full flex justify-center items-center bg-primary">
      <div className=" relative z-10 space-y-4 max-sm:space-y-2">
        <div className=" bg-background max-sm:bg-background/90 p-6 rounded-2xl max-w-[500px] space-y-4 ">
          {children}
        </div>
        <Button
          asChild
          className=" bg-secondary hover:bg-secondary/90 w-full text-secondary-foreground space-x-2 group"
        >
          <Link href="/">
            <p> Go Back Home</p>
            <IconLogout2 className=" group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </Button>
      </div>
      {/* <BackgroundBeams /> */}
      <div className="  absolute top-12 max-sm:top-2 right-32 max-lg:right-12 max-sm:right-4">
        <Image
          src="/images/auth-bg-1.jpg"
          alt="music"
          width={400}
          height={400}
          className=" rounded-full max-lg:w-[200px] max-sm:w-[120px]"
        />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-primary [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>
      </div>
      <div className="  absolute bottom-20 max-md:bottom-4 left-12 max-sm:left-2">
        <Image
          src="/images/auth-bg-2.jpg"
          alt="music"
          width={300}
          height={300}
          className=" rounded-full max-sm:w-[200px]"
        />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-primary [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"></div>
      </div>
    </main>
  );
}
