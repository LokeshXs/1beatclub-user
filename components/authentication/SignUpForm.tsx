"use client";

import { signupFormSchema } from "@/schema/schema";
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
import PasswordInput from "../ui/PasswordInput";
import { useTransition } from "react";
import { signUpAction } from "@/actions/authentication";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

// FUNCTION_BEGINS_HERE

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signUpFormSubmissionHandler = (
    value: z.infer<typeof signupFormSchema>
  ) => {
    startTransition(async () => {
      const res = await signUpAction(value);

      if (res.status === "success") {
        toast.success(res.message);
        router.push('/signin')
        
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(signUpFormSubmissionHandler)}
        className=" space-y-4 mt-6 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" className=" text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" className=" text-base"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className=" w-full" disabled={isPending}>
          {isPending ? "Signing Up" : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
