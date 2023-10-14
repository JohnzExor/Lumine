import { User } from "firebase/auth";
import { z } from "zod";

export type UserData = {
  firstName: string;
  lastName: string;
  uid: string;
};

export type PostData = {
  postId: string;
  author: string;
  text: string;
  uid: string;
};

export type Firebase = {
  currentUser: User | null;
  signIn: (email: string, password: string) => void;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  signOut: () => void;
  initializeAuthStateListener: () => void;
  addPost: (text: string, author: string, uid: string | undefined) => void;
  editPost: (documentID: string, text: string) => void;
  deletePost: (documentID: string) => void;
};

export const signUpFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "email must be at least 5 characters.",
  }),
  lastName: z.string().min(2, {
    message: "email must be at least 5 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 5 characters.",
  }),
  password: z.string().min(2, {
    message: "email must be at least 5 characters.",
  }),
});

export const signInFormSchema = z.object({
  email: z.string().min(5, {
    message: "email must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "email must be at least 5 characters.",
  }),
});

export const postFormSchema = z.object({
  bio: z.string().min(1, {
    message: "Bio must be at least 1 characters.",
  }),
});