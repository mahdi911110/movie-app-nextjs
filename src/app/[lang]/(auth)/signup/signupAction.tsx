"use server";

import { createUserSession } from "@/lib/auth";
import { createUser } from "@/lib/moviedb";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import * as z from "zod";

const Signup = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email"),
    password: z.string()
      .regex(/[a-z]/, "Must contain lowercase")
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/\d/, "Must contain number")
      .regex(/[^A-Za-z0-9]/).min(8, "Password must be at least 8 characters"),
    passwordAgain: z.string()
      .regex(/[a-z]/, "Must contain lowercase")
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/\d/, "Must contain number")
      .regex(/[^A-Za-z0-9]/).min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: "Passwords don't match",
    path: ["passwordAgain"],
  });

type PrevState = {
  error: string;
} | null;

export async function signupAction(
  lang: 'fa' | 'en',
  prevState: PrevState,
  formData: FormData
) {
  const signupForm = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordAgain: formData.get("passwordAgain"),
  };

  const result = Signup.safeParse(signupForm);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const data = result.data;

  const password_hash = await bcrypt.hash(data.password, 18);

  const resultUser = createUser(
    data.username,
    data.email,
    password_hash
  );

  if ("error" in resultUser) {
    return {
      error: resultUser.error,
    };
  }

  await createUserSession(resultUser.userId);

  redirect(`/${lang}`);
}