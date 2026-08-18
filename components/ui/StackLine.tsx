import { formatStack } from "@/lib/formatStack";

interface StackLineProps {
  slugs: string[];
}

export function StackLine({ slugs }: StackLineProps) {
  if (slugs.length === 0) return null;

  return (
    <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
      <span className="text-muted/70">Stack</span>
      <span className="mx-2 text-wireframe" aria-hidden>
        ·
      </span>
      <span className="text-paper/80">{formatStack(slugs)}</span>
    </p>
  );
}
