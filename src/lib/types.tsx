import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { z } from "zod";

export type UserData = {
  firstName: string;
  lastName: string;
  uid: string;
  email: string;
};

export type verifiedUID = {
  uid: string;
};

export type PostData = {
  postId: string;
  author: string;
  text: string;
  uid: string;
  createdAt: string;
  updatedAt: string;
  privacy: string;
};

export type Firebase = {
  currentUser: User | null;
  userData: DocumentData;
  verified_users: verifiedUID[];
  lumine_developers: verifiedUID[];
  userProfile: DocumentData;
  userPostsData: PostData[];
  postsData: PostData[];
  getUserData: () => Promise<void>;
  getUserProfileData: (uid: string) => Promise<void>;
  signIn: (email: string, password: string) => void;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  signOut: () => void;
  initializeAuthStateListener: () => void;
  getPostsData: () => void;
  addPost: (
    text: string,
    author: string,
    uid: string | undefined,
    privacy: string
  ) => void;
  editPost: (documentID: string, text: string) => void;
  deletePost: (documentID: string) => void;
};

export const signUpFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 5 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 5 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 5 characters.",
  }),
});

export const signInFormSchema = z.object({
  email: z.string().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const postFormSchema = z.object({
  bio: z.string().min(1, {
    message: "Bio must be at least 1 character.",
  }),
});
