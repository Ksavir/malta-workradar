import Link from "next/link";
import { notFound } from "next/navigation";
import { RatingSummary } from "@/components/companies/RatingSummary";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getApprovedCompanyBySlug } from "@/lib/companies/queries";

type CompanyDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { slug } = await params;
  const { company, isConfigured } = await getApprovedCompanyBySlug(slug);

  if (!isConfigured) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:px-10">
          <Card className="p-6">
            <h1 className="text-2xl font-semibold text-ink">
              Supabase is not configured
            </h1>
            <p className="mt-3 leading-7 text-ink/65">
              Add your Supabase environment variables to load company profiles.
            </p>
          </Card>
        </section>
        <Footer />
      </main>
    );
  }

  if (!company) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Badge>{company.sector}</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {company.name}
            </h1>
            <p className="mt-4 text-lg text-ink/65">{company.location}</p>
            {company.website ? (
              <a
                className="mt-5 inline-flex font-semibold text-moss"
                href={company.website}
                rel="noreferrer"
                target="_blank"
              >
                Visit website
              </a>
            ) : null}
            <p className="mt-8 leading-8 text-ink/70">
              {company.description || "No public description has been added yet."}
            </p>
            <Link
              className="mt-8 inline-flex rounded-full bg-moss px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-ink"
              href="/dashboard"
            >
              Leave a review
            </Link>
          </div>

          <RatingSummary summary={company.ratingSummary} />
        </div>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Badge>Approved reviews</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
                Workplace signals
              </h2>
            </div>
            <p className="text-sm font-semibold text-ink/55">
              {company.ratingSummary.reviewCount} total
            </p>
          </div>

          {company.reviews.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {company.reviews.map((review) => (
                <Card className="p-6" key={review.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-ink">
                        {review.job_title}
                      </h3>
                      <p className="mt-1 text-sm text-ink/55">
                        {review.employment_type.replaceAll("_", " ")}
                      </p>
                    </div>
                    <span className="rounded-full bg-cream px-3 py-1 text-sm font-semibold text-moss">
                      {review.overall_rating}/5
                    </span>
                  </div>
                  {review.pros ? (
                    <p className="mt-5 leading-7 text-ink/70">{review.pros}</p>
                  ) : null}
                  {review.cons ? (
                    <p className="mt-4 leading-7 text-ink/55">{review.cons}</p>
                  ) : null}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-8 p-6">
              <h3 className="text-xl font-semibold text-ink">No approved reviews yet</h3>
              <p className="mt-3 leading-7 text-ink/65">
                Reviews will appear here after moderation.
              </p>
            </Card>
          )}
        </section>
      </section>
      <Footer />
    </main>
  );
}
