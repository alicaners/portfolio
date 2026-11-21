export function LayerMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path className="l1" style={{ stroke: "var(--acc)" }} d="M12 3 21 8l-9 5-9-5 9-5Z" />
      <path className="l2" d="m3 12 9 5 9-5" />
      <path className="l3" d="m3 16 9 5 9-5" />
    </svg>
  );
}
