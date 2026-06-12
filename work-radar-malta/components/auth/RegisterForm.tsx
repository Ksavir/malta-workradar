"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerAction, type AuthActionResult } from "@/actions/auth";
import { AuthNotice } from "@/components/auth/AuthNotice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { registerSchema, type RegisterInput } from "@/schemas/auth";

export function RegisterForm() {
  const router = useRouter();
  const [result, setResult] = useState<AuthActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(input: RegisterInput) {
    startTransition(async () => {
      const nextResult = await registerAction(input);
      setResult(nextResult);

      if (nextResult.ok) {
        router.push("/dashboard");
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
          autoComplete="new-password"
          id="password"
          placeholder="At least 8 characters"
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
        {isPending ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-sm text-ink/65">
        Already have an account?{" "}
        <Link className="font-semibold text-moss" href="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
