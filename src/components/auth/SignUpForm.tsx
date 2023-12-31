import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { useFirebaseServices } from "../store/useFirebase";
import { signUpFormSchema } from "@/lib/types";
import { useEffect } from "react";
import { auth } from "@/Firebase";

import loginBackground from "@/assets/login.svg";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useFirebaseServices();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    }
  }, [auth.currentUser]);

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    signUp(values.firstName, values.lastName, values.email, values.password);
    navigate("/home");
  };
  return (
    <div className=" p-4 flex gap-20 justify-center items-center h-screen w-full">
      <img
        src={loginBackground}
        className=" md:w-2/5 absolute md:relative md:none -z-10 md:block"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 backdrop-blur-2xl rounded-sm p-4"
        >
          <h1 className=" text-center text-3xl">Create an Account</h1>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
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
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className=" w-full dark:bg-slate-900 dark:text-white"
          >
            Create Account
          </Button>
          <p>
            Already have an Account?{" "}
            <Link to={"/login"} className="font-bold">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
