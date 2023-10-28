import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div className="pt-16">
      <div className=" pl-40 hidden md:block">
        <SideBar />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
