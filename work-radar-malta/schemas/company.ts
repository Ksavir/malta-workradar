import { z } from "zod";
import { COMPANY_SECTORS } from "@/lib/companies/constants";

const optionalUrlSchema = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined))
  .pipe(z.url("Enter a valid website URL.").optional());

export const companySchema = z.object({
  name: z.string().trim().min(1, "Company name is required.").max(160),
  sector: z.enum(COMPANY_SECTORS, "Choose a sector."),
  location: z.string().trim().min(1, "Location is required.").max(120),
  website: optionalUrlSchema,
  description: z
    .string()
    .trim()
    .max(1000, "Description must be 1000 characters or less.")
    .optional()
    .transform((value) => (value ? value : undefined))
});

export type CompanyFormInput = z.input<typeof companySchema>;
export type CompanyInput = z.output<typeof companySchema>;
