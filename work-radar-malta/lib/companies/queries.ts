import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ApprovedCompany,
  ApprovedReview,
  CompanyRatingSummary,
  CompanyWithReviews
} from "@/types/company";

export type CompanyFilters = {
  query?: string;
  sector?: string;
  location?: string;
};

const reviewColumns = `
  id,
  job_title,
  employment_type,
  overall_rating,
  salary_rating,
  payment_punctuality_rating,
  work_environment_rating,
  schedule_respect_rating,
  management_rating,
  contract_transparency_rating,
  growth_opportunity_rating,
  pros,
  cons,
  advice,
  created_at
`;

function average(values: number[]) {
  if (values.length === 0) {
    return null;
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round((total / values.length) * 10) / 10;
}

export function summarizeReviews(reviews: ApprovedReview[]): CompanyRatingSummary {
  return {
    reviewCount: reviews.length,
    overall: average(reviews.map((review) => review.overall_rating)),
    salary: average(reviews.map((review) => review.salary_rating)),
    paymentPunctuality: average(
      reviews.map((review) => review.payment_punctuality_rating)
    ),
    workEnvironment: average(reviews.map((review) => review.work_environment_rating)),
    scheduleRespect: average(reviews.map((review) => review.schedule_respect_rating)),
    management: average(reviews.map((review) => review.management_rating)),
    contractTransparency: average(
      reviews.map((review) => review.contract_transparency_rating)
    ),
    growthOpportunity: average(
      reviews.map((review) => review.growth_opportunity_rating)
    )
  };
}

export async function getApprovedCompanies(filters: CompanyFilters = {}) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { companies: [], isConfigured: false };
  }

  let query = supabase
    .from("companies")
    .select("id, name, slug, sector, location, website, description, logo_url")
    .eq("status", "approved")
    .order("name", { ascending: true });

  if (filters.query) {
    query = query.ilike("name", `%${filters.query}%`);
  }

  if (filters.sector) {
    query = query.eq("sector", filters.sector);
  }

  if (filters.location) {
    query = query.eq("location", filters.location);
  }

  const { data, error } = await query;

  if (error) {
    return { companies: [], isConfigured: true };
  }

  return {
    companies: (data || []) as ApprovedCompany[],
    isConfigured: true
  };
}

export async function getApprovedCompanyFilters() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { locations: [], isConfigured: false };
  }

  const { data } = await supabase
    .from("companies")
    .select("location")
    .eq("status", "approved")
    .order("location", { ascending: true });

  const locations = Array.from(
    new Set((data || []).map((company) => company.location).filter(Boolean))
  );

  return { locations, isConfigured: true };
}

export async function getApprovedCompanyBySlug(
  slug: string
): Promise<{ company: CompanyWithReviews | null; isConfigured: boolean }> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { company: null, isConfigured: false };
  }

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id, name, slug, sector, location, website, description, logo_url")
    .eq("status", "approved")
    .eq("slug", slug)
    .maybeSingle();

  if (companyError || !company) {
    return { company: null, isConfigured: true };
  }

  const { data: reviews } = await supabase
    .from("reviews")
    .select(reviewColumns)
    .eq("company_id", company.id)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  const approvedReviews = (reviews || []) as ApprovedReview[];

  return {
    company: {
      ...(company as ApprovedCompany),
      reviews: approvedReviews,
      ratingSummary: summarizeReviews(approvedReviews)
    },
    isConfigured: true
  };
}
