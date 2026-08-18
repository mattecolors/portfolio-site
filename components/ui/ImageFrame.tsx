"use client";

import Image from "next/image";
import { useState } from "react";
import { assetPath } from "@/lib/assetPath";

interface ImageFrameProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  href?: string;
}

export function ImageFrame({
  src,
  alt,
  aspectRatio = "aspect-video",
  className = "",
  priority = false,
  href,
}: ImageFrameProps) {
  const [error, setError] = useState(false);

  const frameClass = `relative overflow-hidden rounded-md border border-wireframe ${aspectRatio} ${className}`;

  if (error) {
    return (
      <div className={`${frameClass} bg-surface`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs text-muted/60">Image pending</span>
        </div>
      </div>
    );
  }

  const imageContent = (
    <Image
      src={assetPath(src)}
      alt={alt}
      fill
      className={`object-cover transition-opacity duration-300 ${href ? "group-hover:opacity-90" : ""}`}
      sizes="(max-width: 768px) 100vw, 960px"
      priority={priority}
      onError={() => setError(true)}
    />
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block ${frameClass} transition-colors hover:border-lichen/40`}
        aria-label={`Visit ${alt}`}
      >
        {imageContent}
      </a>
    );
  }

  return <div className={frameClass}>{imageContent}</div>;
}
