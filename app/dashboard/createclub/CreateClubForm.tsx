"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClubFormSchema } from "@/schema/schema";
import { useTransition } from "react";
import { createClubAction } from "@/actions/club";
import { toast } from "sonner";

export default function CreateClubForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof createClubFormSchema>>({
    resolver: zodResolver(createClubFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createClubFormSchema>) {
    startTransition(async () => {
      const res = await createClubAction(values);
      if (res.status === "success") {
        toast.success(res.message);
        router.push("/dashboard");
      } else if (res.status === "error") {
        toast.error(res.message);
      }
    });
  }

  return (
    <Form {...form}>
      
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" bg-secondary text-secondary-foreground p-6 rounded-xl flex flex-col gap-6 w-[500px] "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className=" flex flex-col gap-2 items-center ">
              <FormLabel className=" text-lg">Club Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your club name"
                  {...field}
                  className=" bg-secondary-foreground text-secondary"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{pending ? "Creating" : "Create"}</Button>
      </form>
    </Form>
  );
}
