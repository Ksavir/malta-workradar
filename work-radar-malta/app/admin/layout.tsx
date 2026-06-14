import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminNav } from "@/components/admin/AdminNav";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { getAdminContext } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const context = await getAdminContext();

  if (!context.isConfigured) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 lg:px-10">
          <Card className="p-6">
            <h1 className="text-2xl font-semibold text-ink">
              Admin is not configured
            </h1>
            <p className="mt-3 leading-7 text-ink/65">
              Add Supabase environment variables before using moderation tools.
            </p>
          </Card>
        </section>
        <Footer />
      </main>
    );
  }

  if (!context.isAllowed) {
    redirect("/login?next=/admin");
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[240px_1fr] lg:px-10">
        <AdminNav />
        <div>{children}</div>
      </section>
      <Footer />
    </main>
  );
}
