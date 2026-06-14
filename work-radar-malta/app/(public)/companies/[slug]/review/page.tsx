import { redirect } from "next/navigation";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getApprovedCompanyOptionBySlug } from "@/lib/reviews/queries";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CompanyReviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CompanyReviewPage({ params }: CompanyReviewPageProps) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:px-10">
          <Card className="p-6">
            <h1 className="text-2xl font-semibold text-ink">
              Review submissions are not configured
            </h1>
            <p className="mt-3 leading-7 text-ink/65">
              Add Supabase environment variables before submitting reviews.
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
    redirect(`/login?next=/companies/${slug}/review`);
  }

  const { company } = await getApprovedCompanyOptionBySlug(slug);

  if (!company) {
    redirect("/companies");
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div>
          <Badge>{company.sector}</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Review {company.name}.
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink/65">
            Your review is submitted anonymously and held for moderation before
            public display.
          </p>
        </div>
        <Card className="p-6 sm:p-8">
          <ReviewForm companies={[company]} lockedCompanyId={company.id} />
        </Card>
      </section>
      <Footer />
    </main>
  );
}
