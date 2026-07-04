interface ComingSoonBadgeProps {
  className?: string;
}

export default function ComingSoonBadge({ className = '' }: ComingSoonBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-sans font-medium text-[11px] sm:text-[12px] uppercase tracking-[0.14em] bg-orange/12 text-orange border border-orange/25 select-none ${className}`}
    >
      Coming Soon
    </span>
  );
}
