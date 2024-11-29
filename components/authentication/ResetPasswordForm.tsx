"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  resetPasswordFormSchema,
} from "@/schema/schema";
import { useTransition } from "react";
import {
  resetPasswordAction,
} from "@/actions/authentication";
import { toast } from "sonner";
import PasswordInput from "../ui/PasswordInput";
import { useRouter } from "next/navigation";



export default function PasswordResetForm({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    startTransition(async () => {
      const res = await resetPasswordAction(values, email);

      if (res.status === "error") {
        toast.error(res.message);

        return;
      }

      if (res.status === "success") {
        toast.success(res.message);

        router.push("/sigin");

        return;
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 ">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" flex justify-center">
          <Button
            type="submit"
            disabled={isPending}
            className=" px-6 bg-secondary text-pretty text-primary hover:bg-secondary/90"
          >
            {isPending ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
