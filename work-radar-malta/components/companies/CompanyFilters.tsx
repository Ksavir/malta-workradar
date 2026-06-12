import { COMPANY_SECTORS } from "@/lib/companies/constants";

type CompanyFiltersProps = {
  defaultLocation?: string;
  defaultQuery?: string;
  defaultSector?: string;
  locations: string[];
};

export function CompanyFilters({
  defaultLocation = "",
  defaultQuery = "",
  defaultSector = "",
  locations
}: CompanyFiltersProps) {
  return (
    <form
      action="/companies"
      className="grid gap-3 rounded-lg border border-line bg-paper p-4 shadow-soft md:grid-cols-[1.4fr_1fr_1fr_auto]"
    >
      <input
        className="rounded-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-harbour focus:ring-4 focus:ring-harbour/10"
        defaultValue={defaultQuery}
        name="q"
        placeholder="Search by company name"
        type="search"
      />
      <select
        className="rounded-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-harbour focus:ring-4 focus:ring-harbour/10"
        defaultValue={defaultSector}
        name="sector"
      >
        <option value="">All sectors</option>
        {COMPANY_SECTORS.map((sector) => (
          <option key={sector} value={sector}>
            {sector}
          </option>
        ))}
      </select>
      <select
        className="rounded-full border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-harbour focus:ring-4 focus:ring-harbour/10"
        defaultValue={defaultLocation}
        name="location"
      >
        <option value="">All locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <button
        className="rounded-full bg-moss px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
