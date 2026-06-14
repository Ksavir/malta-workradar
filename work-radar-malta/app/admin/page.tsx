import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getAdminMetrics } from "@/lib/admin/queries";

const metricLinks = [
  ["Pending companies", "pendingCompanies", "/admin/companies"],
  ["Pending reviews", "pendingReviews", "/admin/reviews"],
  ["Open reports", "openReports", "/admin/reports"]
] as const;

export default async function AdminPage() {
  const metrics = await getAdminMetrics();

  return (
    <div>
      <Badge>Admin dashboard</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">
        Moderation overview.
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink/65">
        Review pending companies, workplace reviews, and open reports before
        anything sensitive becomes public.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {metricLinks.map(([label, key, href]) => (
          <Link href={href} key={key}>
            <Card className="p-6 transition hover:-translate-y-0.5 hover:border-moss">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink/45">
                {label}
              </p>
              <p className="mt-4 text-4xl font-semibold text-ink">{metrics[key]}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
