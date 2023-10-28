import Home from "./components/Home";
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
import Profile from "./components/Profile";
import PublicPosts from "./components/PublicPosts";
import { ThemeProvider } from "./components/Theme-Provider";

const App = () => {
  const { initializeAuthStateListener, getUserData, getPostsData } =
    useFirebaseServices();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeAuthStateListener();
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
          ""
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
              <Route path="/profile/:uid/*" element={<Profile />} />
            </Route>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<SignInForm />} />
            <Route
              path="*"
              element={
                <div className="flex justify-center items-center h-screen bg-[url('/src/assets/404.svg')]"></div>
              }
            />
          </Routes>
        )}

        <Toaster />
      </ThemeProvider>
    </div>
  );
};

export default App;
