"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordAction, type AuthActionResult } from "@/actions/auth";
import { AuthNotice } from "@/components/auth/AuthNotice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/schemas/auth";

export function ForgotPasswordForm() {
  const [result, setResult] = useState<AuthActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  function onSubmit(input: ForgotPasswordInput) {
    startTransition(async () => {
      setResult(await forgotPasswordAction(input));
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

      {result ? (
        <AuthNotice message={result.message} type={result.ok ? "success" : "error"} />
      ) : null}

      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? "Sending reset link..." : "Send reset link"}
      </Button>

      <p className="text-sm text-ink/65">
        Remembered it?{" "}
        <Link className="font-semibold text-moss" href="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
