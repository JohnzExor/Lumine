import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";
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
import { ModeToggle } from "./Mode-Toggle";

const SideBar = () => {
  const { userData, signOut } = useFirebaseServices();

  return (
    <div className="flex flex-col h-5/6 fixed">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage />
          <AvatarFallback className=" font-bold uppercase">
            {userData.firstName?.substring(0, 1)}
          </AvatarFallback>
        </Avatar>
        <label className=" text-xl">
          {`${userData.firstName} ${userData.lastName}`}
          <p className=" text-xs">{userData.email}</p>
        </label>
      </div>
      <div className="flex flex-col gap-4 mt-4">
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
          <Link to={"/"} className="flex items-center gap-2">
            <AiOutlineHome size={30} />
            Home
          </Link>
        </button>
        <button>
          <Link to={"/accountsettings"} className="flex items-center gap-2">
            <RiUserSettingsLine size={30} />
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
      <div className=" mt-auto space-y-4">
        <div className="flex gap-2 items-center">
          <ModeToggle />
          <p>Theme</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger className=" flex gap-2 items-center">
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
    </div>
  );
};

export default SideBar;
