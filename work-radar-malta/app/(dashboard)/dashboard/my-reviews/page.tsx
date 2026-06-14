import Link from "next/link";
import { redirect } from "next/navigation";
import { ReviewStatusBadge } from "@/components/reviews/ReviewStatusBadge";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getMyReviews } from "@/lib/reviews/queries";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MyReviewsPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard/my-reviews");
  }

  const { reviews } = await getMyReviews();

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>Private dashboard</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              My reviews.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/65">
              Track your submitted workplace reviews and their moderation status.
            </p>
          </div>
          <Link
            className="inline-flex w-fit rounded-full bg-moss px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-ink"
            href="/submit-review"
          >
            Submit review
          </Link>
        </div>

        {reviews.length > 0 ? (
          <div className="mt-10 grid gap-4">
            {reviews.map((review) => (
              <Card className="p-6" key={review.id}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-ink">
                      {review.job_title}
                    </h2>
                    <p className="mt-1 text-ink/60">
                      {review.companies ? review.companies.name : "Company unavailable"}
                    </p>
                  </div>
                  <ReviewStatusBadge status={review.status} />
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-ink/60">
                  <span>{review.employment_type.replaceAll("_", " ")}</span>
                  <span>Overall {review.overall_rating}/5</span>
                </div>
                {review.pros ? (
                  <p className="mt-5 leading-7 text-ink/70">{review.pros}</p>
                ) : null}
                {review.companies ? (
                  <Link
                    className="mt-5 inline-flex font-semibold text-moss"
                    href={`/companies/${review.companies.slug}`}
                  >
                    View company
                  </Link>
                ) : null}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mt-10 p-6">
            <h2 className="text-xl font-semibold text-ink">No reviews yet</h2>
            <p className="mt-3 leading-7 text-ink/65">
              Submit your first anonymous review when you are ready.
            </p>
          </Card>
        )}
      </section>
      <Footer />
    </main>
  );
}
