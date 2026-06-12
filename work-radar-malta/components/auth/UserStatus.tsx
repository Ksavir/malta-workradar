import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/Button";

type UserStatusProps = {
  user: User | null;
};

export function UserStatus({ user }: UserStatusProps) {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition hover:text-moss sm:inline-flex"
          href="/login"
        >
          Sign in
        </Link>
        <Link
          className="inline-flex items-center justify-center rounded-full bg-moss px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ink"
          href="/register"
        >
          Join
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        className="hidden rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss sm:inline-flex"
        href="/dashboard"
      >
        Dashboard
      </Link>
      <form action={logoutAction}>
        <Button size="sm" type="submit" variant="secondary">
          Sign out
        </Button>
      </form>
    </div>
  );
}
