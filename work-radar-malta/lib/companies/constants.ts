export const COMPANY_SECTORS = [
  "Hospitality",
  "Restaurants & Bars",
  "Cleaning",
  "Construction",
  "Retail",
  "Delivery",
  "iGaming",
  "Office & Admin",
  "Healthcare",
  "Education",
  "Other"
] as const;

export type CompanySector = (typeof COMPANY_SECTORS)[number];
