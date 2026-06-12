import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type AuthShellProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

export function AuthShell({ children, description, eyebrow, title }: AuthShellProps) {
  return (
    <main className="min-h-screen bg-cream px-5 py-8 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col">
        <Link className="flex w-fit items-center gap-3" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-sm font-bold text-paper">
            WR
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">
            WorkRadar Malta
          </span>
        </Link>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-moss/70">
              {eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/65">{description}</p>
          </div>

          <Card className="mx-auto w-full max-w-md p-6 sm:p-8">{children}</Card>
        </div>
      </div>
    </main>
  );
}
