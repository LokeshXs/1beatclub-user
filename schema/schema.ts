import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string({ required_error: "Please enter name" }).min(4),
  email: z.string().email("Please enter email"),
  password: z.string().min(8, "Password should be greater than 8 characters"),
});

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export const podcastLaunchFormSchema = z.object({
  title: z.string().min(2, "Please provide a title"),
  description: z.string().min(2, "Please provide a description"),
  hostname: z.string().min(2, "Please provide hostname"),
  date: z
    .date({ required_error: "Please enter date" })
    .refine(
      (enteredDate) => enteredDate > new Date(),
      "Date cannot be past date of today's date"
    ),
});

export const addSongFormSchema = z.object({
  url: z.string().refine(
    (data) => {
      try {
        const url = new URL(data);
        const params = new URLSearchParams(url.search);
        const videoId = params.get("v");
        const id = url.pathname.substring(1);

        return (videoId || id);
      } catch (error) {
        return false;
      }
    },
    {
      message: "Please enter a youtube video url",
    }
  ),
});


export const createClubFormSchema = z.object({
  name: z.string().min(4,"Please enter club name"),
});

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Incorrect mail id"),
});


export const resetPasswordFormSchema = z.object({
  password: z.string().min(8, "Password should be greater than 8 characters"),
})