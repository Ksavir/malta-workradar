import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "light";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-moss text-white shadow-soft hover:bg-ink",
  secondary: "border border-line bg-white text-ink hover:border-moss hover:text-moss",
  light: "bg-paper text-ink hover:bg-white"
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base"
};

export function Button({
  children,
  className = "",
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-harbour/20 ${variants[variant]} ${sizes[size]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
