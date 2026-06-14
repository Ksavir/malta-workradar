import { notFound } from "next/navigation";
import { ReviewModerationCard } from "@/components/admin/ReviewModerationCard";
import { Badge } from "@/components/ui/Badge";
import { getAdminReviewById } from "@/lib/admin/queries";

type AdminReviewDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminReviewDetailPage({
  params
}: AdminReviewDetailPageProps) {
  const { id } = await params;
  const { review } = await getAdminReviewById(id);

  if (!review) {
    notFound();
  }

  return (
    <div>
      <Badge>Review detail</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">
        Moderate review.
      </h1>
      <div className="mt-8">
        <ReviewModerationCard review={review} />
      </div>
    </div>
  );
}
