import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ApprovedCompany } from "@/types/company";

type CompanyCardProps = {
  company: ApprovedCompany;
};

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="p-5 transition hover:-translate-y-0.5 hover:border-moss">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-ink">
            <Link href={`/companies/${company.slug}`}>{company.name}</Link>
          </h2>
          <p className="mt-2 text-sm text-ink/60">{company.location}</p>
        </div>
        <Badge>{company.sector}</Badge>
      </div>
      {company.description ? (
        <p className="mt-5 line-clamp-3 leading-7 text-ink/65">
          {company.description}
        </p>
      ) : (
        <p className="mt-5 leading-7 text-ink/45">
          No public description has been added yet.
        </p>
      )}
      <Link
        className="mt-6 inline-flex text-sm font-semibold text-moss"
        href={`/companies/${company.slug}`}
      >
        View company
      </Link>
    </Card>
  );
}
