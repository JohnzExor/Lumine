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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "email must be at least 5 characters.",
    }),
    lastName: z.string().min(2, {
      message: "email must be at least 5 characters.",
    }),
    email: z.string().min(2, {
      message: "email must be at least 5 characters.",
    }),
    password: z.string().min(2, {
      message: "email must be at least 5 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredentials) => {
          const uid = userCredentials.user.uid;
          setDoc(doc(db, "users", uid), {
            uid: uid,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          });
        })
        .finally(() => {
          navigate("/home");
          form.reset();
        });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className=" p-4 flex justify-center items-center h-screen w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <Button type="submit">Create Account</Button>
          <p>
            Already have an Account?{" "}
            <Link to={"/"} className="font-bold">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
