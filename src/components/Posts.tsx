import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { Textarea } from "@/components/ui/textarea";

import { IoMdClose } from "react-icons/io";
import { auth } from "@/Firebase";
import { PostData } from "@/lib/types";
import { useFirebaseServices } from "./store/useFirebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaGlobeAmericas } from "react-icons/fa";
import { BsPersonFillLock } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { RiVipCrown2Fill } from "react-icons/ri";

type Props = {
  data: PostData;
};

const Posts = ({ data }: Props) => {
  const { editPost, deletePost, verified_users, lumine_developers } =
    useFirebaseServices();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text != "") {
      editPost(data.postId, text);
    }
    setIsEditing(false);
  };

  return (
    <div className=" flex justify-center pt-4">
      <div className=" border rounded-md p-3 w-80 md:w-1/3">
        <div className="">
          <div className="space-y-1 w-full">
            <div className="flex items-start justify-between">
              <Link
                to={`/profile/${data.uid}`}
                className="flex gap-2 items-center"
              >
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback className=" font-bold uppercase">
                    {data.author.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium flex gap-1 items-center">
                    {data.author}
                    {lumine_developers.some((dev) => dev.uid === data.uid) && (
                      <RiVipCrown2Fill />
                    )}
                    {verified_users.some((user) => user.uid === data.uid) && (
                      <MdVerified />
                    )}
                  </h4>
                  <p className=" text-xs flex items-center gap-1">
                    <TimeAgo date={data.createdAt} />
                    {data.privacy === "Public" ? (
                      <FaGlobeAmericas />
                    ) : (
                      <BsPersonFillLock />
                    )}
                  </p>
                </div>
              </Link>

              {data.uid === auth.currentUser?.uid && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <RiArrowDropDownLine size={30} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>This Post</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deletePost(data.postId)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {isEditing ? (
              <form
                onSubmit={onSubmit}
                className=" w-full flex flex-col gap-4 pt-1"
              >
                <Textarea
                  autoFocus
                  defaultValue={data.text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us a little bit about yourself"
                  className=" text-sm resize-none"
                />
                <footer className="flex items-center h-full gap-1 ml-auto">
                  <Button
                    type="submit"
                    className=" h-7 w-20 dark:bg-slate-900 dark:text-white"
                  >
                    Submit
                  </Button>
                  <IoMdClose
                    size={27}
                    className="border rounded-md border-black w-10 cursor-pointer"
                    onClick={() => setIsEditing(false)}
                  />
                </footer>
              </form>
            ) : (
              <p className="text-sm text-muted-foreground break-words">
                {data.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
