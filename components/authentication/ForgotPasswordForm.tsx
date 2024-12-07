"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { forgotPasswordFormSchema } from "@/schema/schema";
import { useTransition } from "react";
import { forgotPasswordAction } from "@/actions/authentication";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    startTransition(async () => {
      const res = await forgotPasswordAction(values);

      if (res.status === "error") {
        toast.error(res.message);
      } else if (res.status === "success") {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID || "",
          {
            to_name: res.name,
            user_email: values.email,
            resetlink: res.link,
            type: "reset your password",
            subject:"Reset Password"
          },
          {
            publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY || "",
          }
        );
        toast.success(res.message);
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input placeholder="Enter email id" {...field} />
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
            {isPending ? "Sending" : "Send"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
