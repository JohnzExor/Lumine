import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useFirebaseServices } from "./store/useFirebase";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SideBar = () => {
  const { userData, signOut, getUserData } = useFirebaseServices();
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Lumine</SheetTitle>
        <SheetDescription>Currently logged in as</SheetDescription>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <label className=" text-xl">
            {`${userData.firstName} ${userData.lastName}`}
            <p className=" text-xs">{userData.email}</p>
          </label>
        </div>
      </SheetHeader>
      <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4 ">
          <SheetClose asChild>
            <Link to="/profile" className="flex items-center gap-2 w-60">
              <CgProfile size={30} />
              Profile
            </Link>
          </SheetClose>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <SheetClose asChild>
            <Link to="/home" className="flex items-center gap-2 w-60">
              <AiOutlineHome size={30} />
              Home
            </Link>
          </SheetClose>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <SheetClose asChild>
            <Link
              to="/accountsettings"
              className="flex items-center gap-2 w-60"
            >
              <GrUserSettings size={27} />
              Account Settings
            </Link>
          </SheetClose>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <SheetClose asChild>
            <Link to="/settings" className="flex items-center gap-2 w-60">
              <FiSettings size={30} />
              Settings
            </Link>
          </SheetClose>
        </div>
      </div>
      <SheetFooter className=" mt-64">
        <AlertDialog>
          <AlertDialogTrigger className=" p-2 bg-black text-white rounded-md">
            Logout
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to be logged out from this device.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <SheetClose asChild>
                <AlertDialogAction
                  onClick={() => {
                    signOut();
                    getUserData();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </SheetClose>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SheetFooter>
    </SheetContent>
  );
};

export default SideBar;
