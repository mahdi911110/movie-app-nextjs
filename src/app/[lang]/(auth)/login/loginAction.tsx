"use server";

import { createUserSession } from "@/lib/auth";
import { login } from "@/lib/moviedb";
import { redirect } from "next/navigation";
import * as z from "zod";

const Login = z.object({
  usernameOrEmail: z.string().min(1),
  password: z
    .string()
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/\d/, "Must contain number")
    .regex(/[^A-Za-z0-9]/)
    .min(8, "Password must be at least 8 characters"),
});

type PrevState = {
  error: boolean;
} | null;

export async function loginAction(
  lang: "fa" | "en",
  prevState: PrevState,
  formData: FormData,
) {
  const loginData = {
    usernameOrEmail: formData.get("usernameOrEmail"),
    password: formData.get("password"),
  };
  const result = Login.safeParse(loginData);
  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }
  const data = result.data;
  const loginResult = await login(data.usernameOrEmail, data.password);
  if (loginResult.error) {
    return { error: loginResult.error };
  }
  if (loginResult.success) {
    await createUserSession(loginResult.userId);
    redirect(`/${lang}`);
  }
}
