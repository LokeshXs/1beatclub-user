import ForgotPasswordForm from "@/components/authentication/ForgotPasswordForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot Password",
  description: "",
};
export default function Page() {
  return (
    <>
      <h1 className=" text-2xl max-sm:text-xl text-center font-semibold text-secondary">
        Forgot Password
      </h1>

      <p className=" text-base max-sm:text-sm  text-center font-normal text-secondary/90 ">
        Type in you registered mail and we will send you a link to reset your
        password!
      </p>

      <ForgotPasswordForm />
    </>
  );
}
