import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      description="Enter your account email and we will send a secure password reset link if the account exists."
      eyebrow="Account recovery"
      title="Reset your password."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
