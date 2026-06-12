import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    await supabase.from("profiles").insert({
      id: user.id,
      role: "user"
    });
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <Badge>Private dashboard</Badge>
        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Your WorkRadar workspace.
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink/65">
            Manage your future company submissions, reviews, and reports from one
            private place. Your identity is never shown publicly.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Companies", "Submit employers for moderation."],
            ["Reviews", "Draft workplace reviews safely."],
            ["Reports", "Track reports you have submitted."]
          ].map(([title, description]) => (
            <Card className="p-6" key={title}>
              <h2 className="text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 leading-7 text-ink/65">{description}</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-moss/60">
                Coming next
              </p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold text-ink">Account status</h2>
          <p className="mt-3 text-ink/65">
            Signed in. Profile fallback is handled automatically if your profile
            record is not available yet.
          </p>
          <Link className="mt-5 inline-flex font-semibold text-moss" href="/">
            Back to public site
          </Link>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
