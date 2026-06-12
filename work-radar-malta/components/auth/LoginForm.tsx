"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginAction, type AuthActionResult } from "@/actions/auth";
import { AuthNotice } from "@/components/auth/AuthNotice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { loginSchema, type LoginInput } from "@/schemas/auth";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath = "/dashboard" }: LoginFormProps) {
  const router = useRouter();
  const [result, setResult] = useState<AuthActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(input: LoginInput) {
    startTransition(async () => {
      const nextResult = await loginAction(input);
      setResult(nextResult);

      if (nextResult.ok) {
        router.push(nextPath);
        router.refresh();
      }
    });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm font-semibold text-ink" htmlFor="email">
          Email
        </label>
        <Input
          autoComplete="email"
          id="email"
          placeholder="you@example.com"
          type="email"
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-2 text-sm text-coral">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-semibold text-ink" htmlFor="password">
          Password
        </label>
        <Input
          autoComplete="current-password"
          id="password"
          placeholder="Enter your password"
          type="password"
          {...register("password")}
        />
        {errors.password ? (
          <p className="mt-2 text-sm text-coral">{errors.password.message}</p>
        ) : null}
      </div>

      {result ? (
        <AuthNotice message={result.message} type={result.ok ? "success" : "error"} />
      ) : null}

      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? "Signing in..." : "Sign in"}
      </Button>

      <div className="flex flex-col gap-2 text-sm text-ink/65 sm:flex-row sm:justify-between">
        <Link className="font-semibold text-moss" href="/register">
          Create account
        </Link>
        <Link className="font-semibold text-moss" href="/forgot-password">
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
