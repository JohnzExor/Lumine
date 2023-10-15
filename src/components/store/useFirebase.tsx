import { auth, db } from "@/Firebase";
import { Firebase, PostData } from "@/lib/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { create } from "zustand";
import { toast } from "../ui/use-toast";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useFirebaseServices = create<Firebase>((set) => ({
  currentUser: null,
  userData: [],
  publicPosts: [],

  signIn: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  },

  signUp: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const uid = userCredentials.user.uid;
        setDoc(doc(db, "users", uid), {
          uid: uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
      }
    );
  },

  signOut: async () => {
    await signOut(auth);
  },

  initializeAuthStateListener: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ currentUser: user });
      } else {
        set({ userData: [] });
      }
    });
  },

  getUserData: async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      if (postData.uid === auth.currentUser?.uid) {
        set({ userData: postData });
      }
    });
  },

  getPublicPosts: async () => {
    const unsubscribe = await onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        const fetchedData: PostData[] = [];

        snapshot.forEach((doc) => {
          const postData = doc.data() as PostData;
          fetchedData.push(postData);
        });
        set({ publicPosts: fetchedData.reverse() });
        console.log("new post");
      }
    );
    return () => {
      unsubscribe();
    };
  },

  addPost: async (text: string, author: string, uid: string | undefined) => {
    const postID = Date.now().toString();
    const currentDate = new Date();
    const currentDateAndTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    await setDoc(doc(db, "posts", postID), {
      author: author,
      text: text,
      uid: uid,
      postId: postID,
      createdAt: currentDateAndTime,
      updatedAt: "",
    })
      .then(() => {
        toast({
          description: "Your message has been sent.",
        });
      })
      .catch((e) => console.error(e));
  },

  editPost: async (documentId: string, text: string) => {
    await updateDoc(doc(db, "posts", documentId), {
      text: text,
    }).then(() => {
      toast({ description: "Edited Successfully" });
    });
  },

  deletePost: async (documentId: string) => {
    await deleteDoc(doc(db, "posts", documentId)).then(() => {
      toast({ description: "Deleted Sucessfully" });
    });
  },
}));
