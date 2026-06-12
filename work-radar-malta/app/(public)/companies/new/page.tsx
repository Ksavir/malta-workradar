import { redirect } from "next/navigation";
import { CompanyForm } from "@/components/companies/CompanyForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewCompanyPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:px-10">
          <Card className="p-6">
            <h1 className="text-2xl font-semibold text-ink">
              Company submissions are not configured
            </h1>
            <p className="mt-3 leading-7 text-ink/65">
              Add Supabase environment variables before submitting companies.
            </p>
          </Card>
        </section>
        <Footer />
      </main>
    );
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/companies/new");
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div>
          <Badge>Pending moderation</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Add a company to WorkRadar Malta.
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink/65">
            New company profiles are saved as pending and reviewed before they
            become public.
          </p>
        </div>
        <Card className="p-6 sm:p-8">
          <CompanyForm />
        </Card>
      </section>
      <Footer />
    </main>
  );
}
