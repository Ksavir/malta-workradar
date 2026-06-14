import { ReviewModerationCard } from "@/components/admin/ReviewModerationCard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getPendingReviews } from "@/lib/admin/queries";

export default async function AdminReviewsPage() {
  const { reviews } = await getPendingReviews();

  return (
    <div>
      <Badge>Review moderation</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">
        Pending reviews.
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink/65">
        Open long reviews before approving, rejecting, or flagging them.
      </p>

      <div className="mt-8 grid gap-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewModerationCard compact key={review.id} review={review} />
          ))
        ) : (
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-ink">No pending reviews</h2>
            <p className="mt-3 leading-7 text-ink/65">
              New review submissions will appear here.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
