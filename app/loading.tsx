"use client";

import Loader from "@/components/ui/loader/loader";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <main className="h-full  bg-primary min-h-screen w-full flex justify-center items-center">
      <Loader />
    </main>
  );
}
