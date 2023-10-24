import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { GrUserSettings } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useFirebaseServices } from "./store/useFirebase";

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
  const { userData, signOut } = useFirebaseServices();
  return (
    <div className="flex flex-col h-5/6">
      <p className=" font-bold">Lumine</p>
      <p className=" font-medium text-sm">Currently logged in as</p>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className=" font-bold uppercase">L</AvatarFallback>
        </Avatar>
        <label className=" text-xl">
          {`${userData.firstName} ${userData.lastName}`}
          <p className=" text-xs">{userData.email}</p>
        </label>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <button>
          <Link
            to={`/profile/${userData.uid}`}
            className="flex items-center gap-2"
          >
            <CgProfile size={30} />
            Profile
          </Link>
        </button>
        <button>
          <Link to={"/home"} className="flex items-center gap-2">
            <AiOutlineHome size={30} />
            Home
          </Link>
        </button>
        <button>
          <Link to={"/accountsettings"} className="flex items-center gap-2">
            <GrUserSettings size={30} />
            Account Settings
          </Link>
        </button>
        <button>
          <Link to={"/settings"} className="flex items-center gap-2">
            <FiSettings size={30} />
            Settings
          </Link>
        </button>
      </div>
      <AlertDialog>
        <AlertDialogTrigger className="mt-auto mr-auto flex gap-2 items-center">
          <BiLogOut size={30} /> Logout
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out</AlertDialogTitle>
            <AlertDialogDescription>
              Logging out on this device will occur once you confirm it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => signOut()}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SideBar;
