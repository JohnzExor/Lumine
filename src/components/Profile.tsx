import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFirebaseServices } from "./store/useFirebase";
import PostForm from "./forms/PostForm";
import { useEffect } from "react";
import Posts from "./Posts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Profile = () => {
  const { getUserPosts, userPosts } = useFirebaseServices();

  useEffect(() => {
    getUserPosts();
  }, []);

  const { userData } = useFirebaseServices();
  return (
    <div className=" flex flex-col justify-center pt-16 w-full h-auto">
      <div className=" flex flex-col items-center mb-2">
        <Avatar className=" h-52 w-52">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
        <label className=" text-3xl font-semibold mt-1">{`${userData.firstName} ${userData.lastName}`}</label>
        <p>{userData.email}</p>
        <Button className="mt-2">
          <Link to="/accountsettings">Edit Profile</Link>
        </Button>
        <hr className=" w-72 mt-4" />
      </div>
      <div>
        <PostForm />
        {userPosts.map((data, index) => (
          <Posts data={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
