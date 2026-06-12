import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-full border border-line bg-white px-5 py-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-harbour focus:ring-4 focus:ring-harbour/10 ${className}`}
      {...props}
    />
  );
}
