import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      description="Create a private account before sharing workplace experiences or submitting employers for review."
      eyebrow="Private by design"
      title="Create your account safely."
    >
      <RegisterForm />
    </AuthShell>
  );
}
