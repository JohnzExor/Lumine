import { useState } from "react";
import Posts from "./Posts";
import PostForm from "./forms/PostForm";

import { Skeleton } from "@/components/ui/skeleton";
import { useFirebaseServices } from "./store/useFirebase";

const Home = () => {
  const { postsData } = useFirebaseServices();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <div className="pt-16">
      <PostForm />
      {isLoading ? (
        <div className="flex justify-center items-center space-x-4 pt-8">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        postsData.map((data, index) => <Posts data={data} key={index} />)
      )}
    </div>
  );
};

export default Home;
