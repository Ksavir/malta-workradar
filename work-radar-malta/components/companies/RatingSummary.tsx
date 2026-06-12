import type { CompanyRatingSummary } from "@/types/company";

type RatingSummaryProps = {
  summary: CompanyRatingSummary;
};

const ratingRows: Array<[keyof CompanyRatingSummary, string]> = [
  ["salary", "Salary"],
  ["paymentPunctuality", "Payment punctuality"],
  ["workEnvironment", "Work environment"],
  ["scheduleRespect", "Schedule respect"],
  ["management", "Management"],
  ["contractTransparency", "Contract transparency"],
  ["growthOpportunity", "Growth opportunity"]
];

function formatRating(value: number | null) {
  return value ? value.toFixed(1) : "No data";
}

export function RatingSummary({ summary }: RatingSummaryProps) {
  return (
    <div>
      <div className="rounded-lg bg-ink p-6 text-paper">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-paper/60">
          Overall rating
        </p>
        <div className="mt-4 flex items-end gap-3">
          <span className="text-5xl font-semibold">
            {summary.overall ? summary.overall.toFixed(1) : "-"}
          </span>
          <span className="pb-2 text-paper/60">/ 5</span>
        </div>
        <p className="mt-3 text-sm text-paper/60">
          Based on {summary.reviewCount} approved{" "}
          {summary.reviewCount === 1 ? "review" : "reviews"}.
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {ratingRows.map(([key, label]) => (
          <div className="rounded-lg border border-line bg-paper p-4" key={key}>
            <p className="text-sm text-ink/55">{label}</p>
            <p className="mt-1 text-xl font-semibold text-ink">
              {formatRating(summary[key] as number | null)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
