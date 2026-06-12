import Link from "next/link";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  getApprovedCompanies,
  getApprovedCompanyFilters
} from "@/lib/companies/queries";

type CompaniesPageProps = {
  searchParams?: Promise<{
    location?: string;
    q?: string;
    sector?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CompaniesPage({ searchParams }: CompaniesPageProps) {
  const params = await searchParams;
  const query = params?.q?.trim() || "";
  const sector = params?.sector?.trim() || "";
  const location = params?.location?.trim() || "";

  const [{ companies, isConfigured }, { locations }] = await Promise.all([
    getApprovedCompanies({ query, sector, location }),
    getApprovedCompanyFilters()
  ]);

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge>Approved employers</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Find companies reviewed by workers in Malta.
            </h1>
            <p className="mt-4 text-lg leading-8 text-ink/65">
              Search approved company profiles before comparing workplace
              reviews and employment signals.
            </p>
          </div>
          <Link
            className="inline-flex w-fit items-center justify-center rounded-full bg-moss px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-ink"
            href="/companies/new"
          >
            Add company
          </Link>
        </div>

        <div className="mt-10">
          <CompanyFilters
            defaultLocation={location}
            defaultQuery={query}
            defaultSector={sector}
            locations={locations}
          />
        </div>

        {!isConfigured ? (
          <Card className="mt-8 p-6">
            <h2 className="text-xl font-semibold text-ink">Supabase is not configured</h2>
            <p className="mt-3 leading-7 text-ink/65">
              Add your Supabase environment variables to load approved companies.
            </p>
          </Card>
        ) : null}

        {companies.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard company={company} key={company.id} />
            ))}
          </div>
        ) : isConfigured ? (
          <Card className="mt-8 p-6">
            <h2 className="text-xl font-semibold text-ink">No approved companies found</h2>
            <p className="mt-3 leading-7 text-ink/65">
              Try changing your search or filters. New submissions appear after
              moderation.
            </p>
          </Card>
        ) : null}
      </section>
      <Footer />
    </main>
  );
}
