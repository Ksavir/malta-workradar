import Link from "next/link";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getOpenReports } from "@/lib/admin/queries";

export default async function AdminReportsPage() {
  const { reports } = await getOpenReports();

  return (
    <div>
      <Badge>Report queue</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">
        Open reports.
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink/65">
        Reports are listed here for moderator review. Report resolution actions
        are handled in the next phase.
      </p>

      <div className="mt-8 grid gap-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <Card className="p-6" key={report.id}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-ink">
                      {report.reason.replaceAll("_", " ")}
                    </h2>
                    <AdminStatusBadge status={report.status} />
                  </div>
                  <p className="mt-2 text-sm text-ink/55">
                    {report.reviews?.companies?.name || "Company unavailable"} -{" "}
                    {report.reviews?.job_title || "Review unavailable"}
                  </p>
                </div>
                {report.reviews ? (
                  <Link
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss"
                    href={`/admin/reviews/${report.reviews.id}`}
                  >
                    Review content
                  </Link>
                ) : null}
              </div>
              {report.details ? (
                <p className="mt-5 leading-7 text-ink/70">{report.details}</p>
              ) : null}
            </Card>
          ))
        ) : (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-ink">No open reports</h2>
            <p className="mt-3 leading-7 text-ink/65">
              User reports will appear here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
