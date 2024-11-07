import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className=" bg-primary min-h-screen w-full flex justify-center items-center">
      <div className=" flex flex-col items-center">
        <Image
          src="/images/404.svg"
          alt="not found "
          width={600}
          height={600}
          className=" max-md:w-[400px]"
        />
        <Button
          asChild
          className=" bg-terniary hover:bg-terniary/90 text-terniary-foreground "
        >
          <Link href="/dashboard">Return Home</Link>
        </Button>
      </div>
    </main>
  );
}
