"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

interface PropertyRowData {
  id: string;
  label: string;
  displayValue: number;
  prefix?: string;
  suffix: string;
}

interface PropertyPanelProps {
  rows: PropertyRowData[];
}

function AnimatedValue({
  displayValue,
  prefix = "",
  suffix,
  animate: shouldAnimate,
}: {
  displayValue: number;
  prefix?: string;
  suffix: string;
  animate: boolean;
}) {
  const [count, setCount] = useState(shouldAnimate ? 0 : displayValue);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    const controls = animate(0, displayValue, {
      duration: 1.4,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => setCount(Math.round(latest)),
    });

    return () => controls.stop();
  }, [shouldAnimate, displayValue]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
}

export function PropertyPanel({ rows }: PropertyPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="rounded-md border border-wireframe bg-surface/40"
    >
      {rows.map((row, i) => (
        <motion.div
          key={row.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className={`flex items-baseline justify-between gap-6 px-4 py-3 md:px-5 ${
            i < rows.length - 1 ? "border-b border-wireframe" : ""
          }`}
        >
          <span className="font-mono text-xs text-muted">{row.label}</span>
          <span className="font-mono text-sm tabular-nums text-paper md:text-base">
            <AnimatedValue
              displayValue={row.displayValue}
              prefix={row.prefix}
              suffix={row.suffix}
              animate={isInView}
            />
          </span>
        </motion.div>
      ))}
    </div>
  );
}
