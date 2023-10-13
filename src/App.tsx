import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Protected from "./components/Protected";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";

import { Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { Toaster } from "./components/ui/toaster";
import { collection, getDocs } from "firebase/firestore";

type UserData = {
  firstName: string;
  lastName: string;
  uid: string;
};

const App = () => {
  const [userData, setUserData] = useState<UserData[]>([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const fetchedData: UserData[] = [];

    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      const postData = doc.data() as UserData;
      if (postData.uid === auth.currentUser?.uid) {
        fetchedData.push(postData);
      }
    });

    setUserData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
  }, []);
  return (
    <div>
      {userData.map((data, index) => (
        <NavigationBar userData={data} key={index} />
      ))}

      <Routes>
        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen">
              <img src="./src/assets/404.svg" />
            </div>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
