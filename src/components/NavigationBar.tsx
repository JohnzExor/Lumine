import { FaBarsStaggered } from "react-icons/fa6";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";

import { Link } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

import { signOut } from "firebase/auth";
import { auth } from "@/Firebase";

type UserData = {
  firstName: string;
  lastName: string;
};

type Props = {
  userData: UserData[];
};

const NavigationBar = ({ userData }: Props) => {
  return (
    <nav className=" flex justify-between w-full fixed p-2.5 px-5">
      <label className="font-bold flex items-center gap-2">
        <BsFillJournalBookmarkFill size={25} />
        Lumine
      </label>
      <Sheet>
        <SheetTrigger asChild>
          {auth.currentUser && (
            <button>
              <FaBarsStaggered size={25} />
            </button>
          )}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Lumine</SheetTitle>
            <SheetDescription>Currently logged in as</SheetDescription>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {userData.map((data, index) => (
                <label className=" text-xl" key={index}>
                  {data.firstName + " " + data.lastName}
                  <p className=" text-xs">{auth.currentUser?.email}</p>
                </label>
              ))}
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
                    <AlertDialogAction onClick={() => signOut(auth)}>
                      Continue
                    </AlertDialogAction>
                  </SheetClose>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavigationBar;
