export function PageAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: [
            "linear-gradient(color-mix(in srgb, var(--wireframe) 80%, transparent) 1px, transparent 1px)",
            "linear-gradient(90deg, color-mix(in srgb, var(--wireframe) 80%, transparent) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
