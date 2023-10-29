import Home from "./components/pages/Home";
import NavigationBar from "./components/NavigationBar";
import Protected from "./components/Protected";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";

import { Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Toaster } from "./components/ui/toaster";
import { useFirebaseServices } from "./components/store/useFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import Profile from "./components/pages/Profile";
import PublicPosts from "./components/PublicPosts";
import { ThemeProvider } from "./components/theme/Theme-Provider";
import notFound from "@/assets/404.svg";

import { Skeleton } from "@/components/ui/skeleton";

const App = () => {
  const { initializeAuthStateListener, getUserData, getPostsData } =
    useFirebaseServices();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuthStateListener();
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getPostsData();
        getUserData().then(() => setIsLoading(false));
      } else {
        navigate("/login");
        getUserData().then(() => setIsLoading(false));
      }
    });
  }, [auth.currentUser]);

  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <NavigationBar />
        {isLoading ? (
          <div className="flex items-center justify-center h-screen space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-80 w-80" />
              <Skeleton className="h-4 w-[200px] ml-auto" />
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            >
              <Route path="/" element={<PublicPosts />} />
              <Route path="/profile/:uid" element={<Profile />} />
              <Route
                path="*"
                element={
                  <div className=" flex flex-col gap-4 justify-center items-center h-screen">
                    <img src={notFound} className=" md:w-96" />
                    <h1 className=" text-5xl font-bold">404</h1>
                  </div>
                }
              />
            </Route>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<SignInForm />} />
          </Routes>
        )}
        <Toaster />
      </ThemeProvider>
    </div>
  );
};

export default App;
