import { useEffect, useState } from "react";
import Posts from "./Posts";
import PostForm from "./forms/PostForm";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/Firebase";

type Data = {
  postId: string;
  author: string;
  text: string;
  uid: string;
};

const Home = () => {
  const [data, setData] = useState<Data[]>([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const fetchedData: Data[] = [];

    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      const postData = doc.data() as Data;
      fetchedData.push(postData);
    });

    setData(fetchedData);
  };

  const handleDelete = async (documentId: string) => {
    await deleteDoc(doc(db, "posts", documentId)).then(() => {
      fetchData();
    });
  };

  const handleEdit = async (documentId: string, text: string) => {
    await updateDoc(doc(db, "posts", documentId), {
      text: text,
    }).then(() => fetchData());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <PostForm updatePosts={fetchData} />
      {data.map((data, index) => (
        <Posts
          data={data}
          key={index}
          handleDelete={() => handleDelete(data.postId)}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default Home;
