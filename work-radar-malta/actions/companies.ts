"use server";

import { revalidatePath } from "next/cache";
import { createCompanySlug } from "@/lib/companies/slug";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { companySchema, type CompanyFormInput } from "@/schemas/company";

export type CompanyActionResult = {
  ok: boolean;
  message: string;
};

function nextSlug(baseSlug: string, attempt: number) {
  return attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;
}

export async function createCompanyAction(
  input: CompanyFormInput
): Promise<CompanyActionResult> {
  const parsed = companySchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message || "Check the company details."
    };
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: false,
      message: "Company submissions are not configured yet."
    };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      message: "Sign in before submitting a company."
    };
  }

  const baseSlug = createCompanySlug(parsed.data.name);

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const slug = nextSlug(baseSlug, attempt);
    const { error } = await supabase.from("companies").insert({
      name: parsed.data.name,
      slug,
      sector: parsed.data.sector,
      location: parsed.data.location,
      website: parsed.data.website ?? null,
      description: parsed.data.description ?? null,
      status: "pending",
      created_by: user.id
    });

    if (!error) {
      revalidatePath("/companies");
      return {
        ok: true,
        message:
          "Company submitted. It will appear publicly after it has been reviewed."
      };
    }

    if (error.code !== "23505") {
      return {
        ok: false,
        message: "We could not submit this company. Please try again."
      };
    }
  }

  return {
    ok: false,
    message: "We could not generate a unique company URL. Try a more specific name."
  };
}
