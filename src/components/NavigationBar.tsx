import { FaBarsStaggered } from "react-icons/fa6";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { useFirebaseServices } from "./store/useFirebase";
import SideBar from "./SideBar";

const NavigationBar = () => {
  const { currentUser } = useFirebaseServices();
  return (
    <nav className=" flex justify-between w-full fixed p-4 px-5 bg-slate-50">
      <label className="font-bold flex items-center gap-2">
        <BsFillJournalBookmarkFill size={25} />
        Lumine
      </label>
      <Sheet>
        <SheetTrigger asChild>
          {currentUser && (
            <button>
              <FaBarsStaggered size={25} />
            </button>
          )}
        </SheetTrigger>
        <SideBar />
      </Sheet>
    </nav>
  );
};

export default NavigationBar;
