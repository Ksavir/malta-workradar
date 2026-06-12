"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createCompanyAction, type CompanyActionResult } from "@/actions/companies";
import { AuthNotice } from "@/components/auth/AuthNotice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { COMPANY_SECTORS } from "@/lib/companies/constants";
import { companySchema, type CompanyFormInput } from "@/schemas/company";

export function CompanyForm() {
  const router = useRouter();
  const [result, setResult] = useState<CompanyActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<CompanyFormInput>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      sector: undefined,
      location: "",
      website: "",
      description: ""
    }
  });

  function onSubmit(input: CompanyFormInput) {
    startTransition(async () => {
      const nextResult = await createCompanyAction(input);
      setResult(nextResult);

      if (nextResult.ok) {
        reset();
        router.refresh();
      }
    });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-sm font-semibold text-ink" htmlFor="name">
          Company name
        </label>
        <Input id="name" placeholder="Example Malta Ltd" {...register("name")} />
        {errors.name ? (
          <p className="mt-2 text-sm text-coral">{errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-ink" htmlFor="sector">
            Sector
          </label>
          <select
            className="w-full rounded-full border border-line bg-white px-5 py-4 text-base text-ink outline-none transition focus:border-harbour focus:ring-4 focus:ring-harbour/10"
            id="sector"
            {...register("sector")}
          >
            <option value="">Choose sector</option>
            {COMPANY_SECTORS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          {errors.sector ? (
            <p className="mt-2 text-sm text-coral">{errors.sector.message}</p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-semibold text-ink" htmlFor="location">
            Location
          </label>
          <Input id="location" placeholder="Sliema" {...register("location")} />
          {errors.location ? (
            <p className="mt-2 text-sm text-coral">{errors.location.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-ink" htmlFor="website">
          Website
        </label>
        <Input
          id="website"
          placeholder="https://example.com"
          type="url"
          {...register("website")}
        />
        {errors.website ? (
          <p className="mt-2 text-sm text-coral">{errors.website.message}</p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-semibold text-ink" htmlFor="description">
          Description
        </label>
        <textarea
          className="min-h-36 w-full rounded-lg border border-line bg-white px-5 py-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-harbour focus:ring-4 focus:ring-harbour/10"
          id="description"
          placeholder="What does this company do?"
          {...register("description")}
        />
        {errors.description ? (
          <p className="mt-2 text-sm text-coral">{errors.description.message}</p>
        ) : null}
      </div>

      {result ? (
        <AuthNotice message={result.message} type={result.ok ? "success" : "error"} />
      ) : null}

      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? "Submitting..." : "Submit for review"}
      </Button>
    </form>
  );
}
