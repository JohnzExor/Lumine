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

import { IoMdClose } from "react-icons/io";
import { auth } from "@/Firebase";

type Data = {
  postId: string;
  author: string;
  text: string;
  uid: string;
};

type Props = {
  data: Data;
  handleDelete: () => void;
  handleEdit: (documentId: string, text: string) => void;
};

const Posts = ({ data, handleDelete, handleEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit(data.postId, text);
    setIsEditing(false);
  };

  return (
    <div className=" flex justify-center pt-4">
      <div className=" border rounded-md p-3 w-80">
        <div className=" flex">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">
              {data.author}
              {data.uid === auth.currentUser?.uid && " (You)"}
            </h4>
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
              <p className="text-sm text-muted-foreground break-words w-60">
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
                  <DropdownMenuItem onClick={handleDelete}>
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
