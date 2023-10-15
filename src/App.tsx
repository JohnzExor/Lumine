import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
import Protected from "./components/Protected";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";

import { Route, Routes, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { Toaster } from "./components/ui/toaster";
import { useFirebaseServices } from "./components/store/useFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import Profile from "./components/Profile";
const App = () => {
  const { initializeAuthStateListener, getUserData } = useFirebaseServices();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuthStateListener();
    getUserData();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <NavigationBar />
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
        <Route path="/profile" element={<Profile />} />
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
