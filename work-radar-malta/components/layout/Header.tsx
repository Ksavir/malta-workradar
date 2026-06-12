import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
      <Link className="flex items-center gap-3" href="/">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-sm font-bold text-paper">
          WR
        </span>
        <span className="text-lg font-semibold tracking-tight text-ink">
          WorkRadar Malta
        </span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium text-ink/65 md:flex">
        <a href="#companies">Companies</a>
        <a href="#reviews">Reviews</a>
        <a href="#how-it-works">How it works</a>
      </nav>
      <Button size="sm" variant="secondary">
        Share review
      </Button>
    </header>
  );
}
