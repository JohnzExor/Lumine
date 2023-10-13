import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase";

type Props = {
  updatePosts: () => void;
};

const FormSchema = z.object({
  bio: z.string().min(1, {
    message: "Bio must be at least 1 characters.",
  }),
});

const PostForm = ({ updatePosts }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bio: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const uid = auth.currentUser?.uid;
    const postID = Date.now().toString();

    await setDoc(doc(db, "posts", postID), {
      author: `Lumine${uid?.slice(-5)}`,
      text: data.bio,
      uid: uid,
      postId: postID,
    })
      .then(() => {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        form.reset();
        updatePosts();
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="flex justify-center pt-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-2">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
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
