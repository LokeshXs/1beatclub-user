"use client";

import { signInFormSchema } from "@/schema/schema";
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
import { useState, useTransition } from "react";
import { signInAction, signUpAction } from "@/actions/authentication";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";


// FUNCTION_BEGINS_HERE

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [responseStatus,setResponseStatus] = useState<{type:"success"|"error",message:string} | undefined>();


  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
    
      email: "",
      password: "",
    },
  });

  const signUpFormSubmissionHandler = (
    value: z.infer<typeof signInFormSchema>
  ) => {
    startTransition(async () => {
      setResponseStatus(undefined)
      const res = await signInAction(value);

      if(!res){
        return;
      }

      if (res?.status === "success") {
       

        if(res.message === "Confirmation email sent!"){
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || "",
            process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID || "",
            {
              to_name: res.name,
              user_email: value.email,
              resetlink: res.verificationLink,
              type: "verify your account",
              subject:"Verify Account"
            },
            {
              publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY || "",
            }
          );
  
          toast.success(res.message);
          setResponseStatus({ type: "success", message: res.message });
        }else{
          toast.success(res?.message);
        }
  
       

      } else {
        toast.error(res?.message);
        setResponseStatus({type:"error",message:res.message})
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
          name="email"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" className=" text-base" {...field} />
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
          {isPending ? "Signing In" : "Sign In"}
        </Button>

        {responseStatus && <div className={cn(" px-4 py-2  text-center rounded-lg  text-white ",{
          "bg-red-600/80":responseStatus.type==="error",
          "bg-green-600/80":responseStatus.type==="success",
        })}>
        {responseStatus.message}
          </div>}
      </form>
    </Form>
  );
}
