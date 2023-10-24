import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFirebaseServices } from "./store/useFirebase";
import PostForm from "./forms/PostForm";
import Posts from "./Posts";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "@/Firebase";

const Profile = () => {
  const { userPostsData, userProfile, getUserProfileData } =
    useFirebaseServices();

  const { uid } = useParams();

  useEffect(() => {
    getUserProfileData(uid as string);
  }, [uid]);

  return (
    <div className=" flex flex-col justify-center pt-16 w-full h-auto">
      <div className=" flex flex-col items-center mb-2">
        <Avatar className=" h-52 w-52">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
        <label className=" text-3xl font-semibold mt-1">{`${userProfile.firstName} ${userProfile.lastName}`}</label>
        <p>{userProfile.email}</p>
        {userProfile.uid === auth.currentUser?.uid && (
          <Button className="mt-2">
            <Link to="/accountsettings">Edit Profile</Link>
          </Button>
        )}

        <hr className=" w-72 mt-4" />
      </div>
      <div>
        {userProfile.uid === auth.currentUser?.uid && <PostForm />}
        {userPostsData.map((data, index) =>
          data.privacy === "Public" ? (
            <Posts data={data} key={index} />
          ) : (
            data.uid === auth.currentUser?.uid && (
              <Posts data={data} key={index} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Profile;
