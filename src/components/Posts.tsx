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

import { IoMdClose } from "react-icons/io";
import { auth } from "@/Firebase";
import { PostData } from "@/lib/types";
import { useFirebaseServices } from "./store/useFirebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaGlobeAmericas } from "react-icons/fa";
import { BsPersonFillLock } from "react-icons/bs";

type Props = {
  data: PostData;
};

const Posts = ({ data }: Props) => {
  const { editPost, deletePost } = useFirebaseServices();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editPost(data.postId, text);
    setIsEditing(false);
  };

  return (
    <div className=" flex justify-center pt-4">
      <div className=" border rounded-md p-3 w-80 md:w-1/3">
        <div className=" flex">
          <div className="space-y-1">
            <div>
              <Link
                to={`/profile/${data.uid}`}
                className="flex gap-2 items-center"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className=" font-bold uppercase">
                    {data.author.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium leading-none flex gap-1">
                    {data.author}
                    {data.privacy === "Public" ? (
                      <FaGlobeAmericas />
                    ) : (
                      <BsPersonFillLock />
                    )}
                  </h4>
                  <p className=" text-xs">{data.createdAt}</p>
                </div>
              </Link>
            </div>

            {isEditing ? (
              <form onSubmit={onSubmit} className=" w-64">
                <textarea
                  autoFocus
                  defaultValue={data.text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us a little bit about yourself"
                  className=" text-sm p-2 w-full border border-black rounded-md"
                />
                <footer className="flex items-center h-full gap-1">
                  <Button type="submit" className=" h-7 w-full">
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
              <p className="text-sm text-muted-foreground break-words w-full">
                {data.text}
              </p>
            )}
          </div>
          {data.uid === auth.currentUser?.uid && (
            <div className=" ml-auto">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
