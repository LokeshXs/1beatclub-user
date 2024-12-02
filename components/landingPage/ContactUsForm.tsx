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
import { Textarea } from "../ui/textarea";
import { useTransition } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  name: z.string().min(4, "Min 4 characters required"),
  email: z.string().email("Invalid Email"),
  message: z.string().min(10, "Very small message"),
});

export default function ContactUsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const validateInput = formSchema.safeParse(values);
    if (!validateInput.success) {
      toast.error("Invalid Input");
      return;
    }

    const { name, email, message } = validateInput.data;

    startTransition(async () => {
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAIL_JS_CONTACT_US_TEMPLATE_ID || "",
          {
            from_name: name,
            from_email: email,
            message: message,
          },
          {
            publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY || "",
          }
        );
        toast.success("Your message is sent, We will reach out to you soon!");
        form.reset();
      } catch (err) {
        toast.error("Cannot send message. Try again after sometime!");
        console.log(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  className=" border-primary-foreground"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className=" border-primary-foreground"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What is your message"
                  className=" border-primary-foreground"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex justify-center">
          <Button
            type="submit"
            disabled={isPending}
            className=" bg-secondary text-secondary-foreground hover:bg-secondary/90  w-60"
          >
            {isPending ? "Sending" : "Send"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
