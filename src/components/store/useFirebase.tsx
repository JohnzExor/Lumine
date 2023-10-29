import { auth, db } from "@/Firebase";
import { Firebase, PostData, verifiedUID } from "@/lib/types";
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
  verified_users: [],
  lumine_developers: [],
  userProfile: [],
  userPostsData: [],
  postsData: [],

  signIn: async (email, password) => {
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
    const querySnapshot0 = await getDocs(collection(db, "users"));
    const querySnapshot1 = await getDocs(collection(db, "verified_users"));
    const querySnapshot2 = await getDocs(collection(db, "developers"));

    const fetchedVerifiedUsers: verifiedUID[] = [];
    const fetchedVerifiedDevelopers: verifiedUID[] = [];

    querySnapshot0.forEach((doc) => {
      const postData = doc.data();
      if (postData.uid === auth.currentUser?.uid) {
        set({ userData: postData });
      }
    });

    querySnapshot1.forEach((doc) => {
      const postData = doc.data() as verifiedUID;
      fetchedVerifiedUsers.push(postData);
    });

    querySnapshot2.forEach((doc) => {
      const postData = doc.data() as verifiedUID;
      fetchedVerifiedDevelopers.push(postData);
    });

    set({ verified_users: fetchedVerifiedUsers });
    set({ lumine_developers: fetchedVerifiedDevelopers });
  },

  getUserProfileData: async (uid) => {
    set({ userPostsData: [] });

    const queryUserSnapshot = await getDocs(collection(db, "users"));
    const queryPostsSnapshot = await getDocs(collection(db, "posts"));
    const fetchedUserPostsData: PostData[] = [];

    queryUserSnapshot.forEach((doc) => {
      const postData = doc.data();
      if (postData.uid === uid) {
        set({ userProfile: postData });
      }
    });

    queryPostsSnapshot.forEach((doc) => {
      const postData = doc.data() as PostData;
      if (postData.uid === uid) {
        fetchedUserPostsData.push(postData);
      }
      set({ userPostsData: fetchedUserPostsData.reverse() });
    });
  },

  getPostsData: async () => {
    const unsubscribe = await onSnapshot(
      collection(db, "posts"),
      (snapshot) => {
        const fetchedPostsData: PostData[] = [];

        snapshot.forEach((doc) => {
          const postData = doc.data() as PostData;

          if (postData.privacy === "Public") {
            fetchedPostsData.push(postData);
          }
        });
        set({ postsData: fetchedPostsData.reverse() });

        console.log("new public posts");
      }
    );
    return () => {
      unsubscribe();
    };
  },

  addPost: async (text, author, uid, privacy) => {
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
      privacy: privacy,
    })
      .then(() => {
        toast({
          description: "Your message has been sent.",
        });
      })
      .catch((e) => console.error(e));
  },

  editPost: async (documentId, text) => {
    await updateDoc(doc(db, "posts", documentId), {
      text: text,
    }).then(() => {
      toast({ description: "Edited Successfully" });
    });
  },

  deletePost: async (documentId) => {
    await deleteDoc(doc(db, "posts", documentId)).then(() => {
      toast({ description: "Deleted Sucessfully" });
    });
  },
}));
