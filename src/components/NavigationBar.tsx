import { FaBarsStaggered } from "react-icons/fa6";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import SideBar from "./SideBar";
import { auth } from "@/Firebase";

const NavigationBar = () => {
  return (
    <nav className=" flex items-center justify-between md:justify-center w-full fixed p-4 px-5 z-10 bg-opacity-50 backdrop-blur">
      <label className="font-bold flex items-center gap-2">
        <BsFillJournalBookmarkFill size={25} />
        Lumine
      </label>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            {auth.currentUser && (
              <button className=" hidden max-md:block">
                <FaBarsStaggered size={25} />
              </button>
            )}
          </SheetTrigger>
          <SheetContent>
            <SideBar />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavigationBar;
