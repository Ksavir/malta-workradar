import type { HTMLAttributes, ReactNode } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function Badge({ children, className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex w-fit rounded-full border border-line bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-moss ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
