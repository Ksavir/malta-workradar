import { CompanyModerationCard } from "@/components/admin/CompanyModerationCard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getPendingCompanies } from "@/lib/admin/queries";

export default async function AdminCompaniesPage() {
  const { companies } = await getPendingCompanies();

  return (
    <div>
      <Badge>Company moderation</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">
        Pending companies.
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink/65">
        Approve company profiles only when they are suitable for public listing.
      </p>

      <div className="mt-8 grid gap-4">
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyModerationCard company={company} key={company.id} />
          ))
        ) : (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-ink">No pending companies</h2>
            <p className="mt-3 leading-7 text-ink/65">
              New company submissions will appear here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
