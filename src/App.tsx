import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Protected from "./components/Protected";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";

import { Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Firebase";
import { Toaster } from "./components/ui/toaster";
import { collection, getDocs } from "firebase/firestore";
import { UserData } from "./lib/types";

const App = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const navigate = useNavigate();

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
        navigate("/home");
      }
    });
  }, []);

  return (
    <div>
      <NavigationBar userData={userData} />
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
            <div className="flex justify-center items-center h-screen bg-[url('/src/assets/404.svg')]"></div>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
