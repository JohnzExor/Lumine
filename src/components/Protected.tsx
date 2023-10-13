import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);
  return <>{children}</>;
};

export default Protected;
