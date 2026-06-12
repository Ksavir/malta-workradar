import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath =
    params?.next && params.next.startsWith("/") && !params.next.startsWith("//")
      ? params.next
      : "/dashboard";

  return (
    <AuthShell
      description="Access your private workspace to manage your submissions and keep your identity protected."
      eyebrow="Welcome back"
      title="Sign in to WorkRadar Malta."
    >
      <LoginForm nextPath={nextPath} />
    </AuthShell>
  );
}
