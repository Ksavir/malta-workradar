export type ApprovedCompany = {
  id: string;
  name: string;
  slug: string;
  sector: string;
  location: string;
  website: string | null;
  description: string | null;
  logo_url: string | null;
};

export type ApprovedReview = {
  id: string;
  job_title: string;
  employment_type: string;
  overall_rating: number;
  salary_rating: number;
  payment_punctuality_rating: number;
  work_environment_rating: number;
  schedule_respect_rating: number;
  management_rating: number;
  contract_transparency_rating: number;
  growth_opportunity_rating: number;
  pros: string | null;
  cons: string | null;
  advice: string | null;
  created_at: string;
};

export type CompanyRatingSummary = {
  reviewCount: number;
  overall: number | null;
  salary: number | null;
  paymentPunctuality: number | null;
  workEnvironment: number | null;
  scheduleRespect: number | null;
  management: number | null;
  contractTransparency: number | null;
  growthOpportunity: number | null;
};

export type CompanyWithReviews = ApprovedCompany & {
  reviews: ApprovedReview[];
  ratingSummary: CompanyRatingSummary;
};
