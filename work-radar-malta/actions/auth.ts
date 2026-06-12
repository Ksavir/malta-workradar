"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAppUrl } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  type ForgotPasswordInput,
  type LoginInput,
  type RegisterInput
} from "@/schemas/auth";

export type AuthActionResult = {
  ok: boolean;
  message: string;
};

const missingConfigResult: AuthActionResult = {
  ok: false,
  message: "Authentication is not configured yet. Add your Supabase environment variables."
};

export async function loginAction(input: LoginInput): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Check your details." };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return missingConfigResult;
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { ok: false, message: "Invalid email or password." };
  }

  revalidatePath("/", "layout");
  return { ok: true, message: "Signed in successfully." };
}

export async function registerAction(input: RegisterInput): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Check your details." };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return missingConfigResult;
  }

  const { error } = await supabase.auth.signUp({
    ...parsed.data,
    options: {
      emailRedirectTo: `${getAppUrl()}/dashboard`
    }
  });

  if (error) {
    return { ok: false, message: "We could not create your account. Please try again." };
  }

  revalidatePath("/", "layout");
  return {
    ok: true,
    message: "Account created. Check your email if confirmation is required."
  };
}

export async function forgotPasswordAction(
  input: ForgotPasswordInput
): Promise<AuthActionResult> {
  const parsed = forgotPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Check your email." };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return missingConfigResult;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${getAppUrl()}/login`
  });

  if (error) {
    return { ok: false, message: "We could not send a reset link. Please try again." };
  }

  return {
    ok: true,
    message: "If an account exists for that email, a reset link has been sent."
  };
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/");
}
