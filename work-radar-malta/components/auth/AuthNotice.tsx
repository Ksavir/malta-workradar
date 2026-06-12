type AuthNoticeProps = {
  message: string;
  type: "error" | "success";
};

export function AuthNotice({ message, type }: AuthNoticeProps) {
  return (
    <p
      className={`rounded-lg border px-4 py-3 text-sm ${
        type === "success"
          ? "border-harbour/20 bg-harbour/10 text-moss"
          : "border-coral/20 bg-coral/10 text-coral"
      }`}
      role="status"
    >
      {message}
    </p>
  );
}
