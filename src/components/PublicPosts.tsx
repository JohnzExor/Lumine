import Posts from "./Posts";
import PostForm from "./forms/PostForm";
import { useFirebaseServices } from "./store/useFirebase";

const PublicPosts = () => {
  const { postsData } = useFirebaseServices();

  return (
    <div>
      <PostForm />
      {postsData.map((data, index) => (
        <Posts data={data} key={index} />
      ))}
    </div>
  );
};

export default PublicPosts;
