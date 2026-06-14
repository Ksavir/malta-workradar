import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const featuredCompanies = ["Betsson Group", "MaltaPost", "GO plc"];

const steps = [
  {
    title: "Search employers",
    description:
      "Find workplace signals from people who know the company from the inside."
  },
  {
    title: "Compare the details",
    description:
      "Review patterns around culture, management, growth, and work-life balance."
  },
  {
    title: "Share safely",
    description:
      "Add your experience anonymously when you are ready to help the next person."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <section
        className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-20"
        id="companies"
      >
        <div className="max-w-3xl">
          <Badge>Anonymous workplace insight for Malta</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Make better career decisions in Malta.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70 sm:text-xl">
            Read anonymous workplace reviews, compare employers, and share your
            experience safely.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-moss px-5 py-3 text-base font-semibold text-white shadow-soft transition duration-200 hover:bg-ink focus:outline-none focus:ring-4 focus:ring-harbour/20"
              href="/companies"
            >
              Explore companies
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-base font-semibold text-ink transition duration-200 hover:border-moss hover:text-moss focus:outline-none focus:ring-4 focus:ring-harbour/20"
              href="/submit-review"
            >
              Leave a review
            </Link>
          </div>
        </div>

        <Card className="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-coral/15" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-moss/70">
              Company finder
            </p>
            <div className="mt-5">
              <Input
                aria-label="Search companies"
                placeholder="Search a company in Malta..."
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {featuredCompanies.map((company) => (
                <span
                  className="rounded-full border border-line bg-paper px-3 py-2 text-sm text-ink/70"
                  key={company}
                >
                  {company}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl bg-cream p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">Recent signals</p>
                    <p className="mt-1 text-sm text-ink/60">
                      Culture, growth, management, and compensation.
                    </p>
                  </div>
                  <span className="rounded-full bg-harbour px-3 py-1 text-sm font-semibold text-white">
                    Preview
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {["Culture", "Balance", "Growth"].map((label) => (
                  <div className="rounded-2xl border border-line bg-white p-3" key={label}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">
                      {label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-moss">Soon</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="bg-white py-16 sm:py-20" id="how-it-works">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <Badge>How it works</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Clear workplace context before you make a move.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card className="p-6" key={step.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-moss text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 leading-7 text-ink/65">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10" id="reviews">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-ink px-6 py-10 text-paper shadow-soft sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-paper/60">
              Help build the radar
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your review can help someone choose with more confidence.
            </h2>
          </div>
          <div className="mt-8 lg:mt-0">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-paper px-5 py-3 text-base font-semibold text-ink transition duration-200 hover:bg-white focus:outline-none focus:ring-4 focus:ring-harbour/20"
              href="/submit-review"
            >
              Leave a review
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
