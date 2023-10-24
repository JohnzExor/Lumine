import Posts from "./Posts";
import SideBar from "./SideBar";
import PostForm from "./forms/PostForm";

import { useFirebaseServices } from "./store/useFirebase";

const Home = () => {
  const { postsData } = useFirebaseServices();

  return (
    <div className="pt-16">
      <div className="fixed w-1/5 p-4 border-r-2 pt-10 h-screen hidden md:block ">
        <SideBar />
      </div>
      <div>
        <PostForm />
        {postsData.map((data, index) => (
          <Posts data={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
