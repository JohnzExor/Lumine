import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/Firebase";
import { useEffect, useState } from "react";
import { useFirebaseServices } from "../store/useFirebase";
import { postFormSchema } from "@/lib/types";

const PostForm = () => {
  const { addPost, userData } = useFirebaseServices();
  const [hideID, setHideID] = useState<boolean | null>(null);

  useEffect(() => {
    const hideIDLocal = localStorage.getItem("hideId");
    if (hideIDLocal === "true") setHideID(true);
    else {
      setHideID(false);
    }
  }, [hideID]);

  const onClickHideID = () => {
    if (hideID === false) {
      localStorage.setItem("hideId", "true");
      setHideID(true);
    } else {
      localStorage.setItem("hideId", "false");
      setHideID(false);
    }
  };

  const uid = auth.currentUser?.uid;
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      bio: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    const author = hideID
      ? `Lumine${uid?.slice(-5)}`
      : `${userData.firstName} ${userData.lastName}`;
    addPost(data.bio, author, uid);
    form.reset();
  };

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-2">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Bio</FormLabel>
                  <div className="ml-auto items-center flex gap-2 text-sm">
                    <label
                      htmlFor="hide-name"
                      className={!hideID ? "" : " opacity-30"}
                    >
                      Post as{" "}
                      <span className=" font-medium">
                        Lumine{uid?.slice(-5)}?
                      </span>
                    </label>
                    <Switch
                      checked={hideID as boolean}
                      onCheckedChange={() => onClickHideID()}
                      aria-readonly
                    />
                  </div>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
