interface SectionLabelProps {
  title: string;
}

export function SectionLabel({ title }: SectionLabelProps) {
  return (
    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
      {title}
    </h2>
  );
}
