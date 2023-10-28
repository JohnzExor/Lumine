import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFirebaseServices } from "../store/useFirebase";
import PostForm from "../forms/PostForm";
import Posts from "../Posts";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/Firebase";

import { Skeleton } from "@/components/ui/skeleton";
import { MdVerified } from "react-icons/md";
import { RiVipCrown2Fill } from "react-icons/ri";

const Profile = () => {
  const {
    userPostsData,
    userProfile,
    getUserProfileData,
    verified_users,
    lumine_developers,
  } = useFirebaseServices();
  const { uid } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUserProfileData(uid as string).then(() => {
      setIsLoading(false);
    });
  }, [uid]);
  return (
    <div className=" flex flex-col justify-center pt-10 w-full h-auto">
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-52 w-52 rounded-full" />
          <div className="flex items-center space-x-4 justify-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className=" flex flex-col items-center mb-2">
            <Avatar className=" h-52 w-52">
              <AvatarImage />
              <AvatarFallback className=" text-9xl font-bold">
                {userProfile.firstName?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <label className=" text-3xl font-semibold mt-1 flex items-center gap-1">
              {`${userProfile.firstName} ${userProfile.lastName}`}
              {lumine_developers.uid == userProfile.uid && <RiVipCrown2Fill />}
              {verified_users.uid === userProfile.uid && <MdVerified />}
            </label>
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
        </>
      )}
    </div>
  );
};

export default Profile;
