import Image from "next/image";
import type { ProvideImages } from "@/data/types";
import { ImageFrame } from "../ui/ImageFrame";

interface ProvideVisualsProps {
  images: ProvideImages;
}

export function ProvideVisuals({ images }: ProvideVisualsProps) {
  return (
    <div className="space-y-4">
      <ImageFrame
        src={images.dashboardPreview}
        alt="Provide dashboard map preview"
        aspectRatio="aspect-[16/9]"
        priority
        href={images.siteUrl}
      />
      <div className="flex items-center gap-4 rounded-md border border-wireframe bg-surface/30 px-4 py-3">
        <div className="relative h-12 w-24 shrink-0 opacity-80">
          <Image
            src={images.heroSvg}
            alt="NC map"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <p className="text-sm text-muted">
          Food-access mapping for North Carolina
        </p>
      </div>
    </div>
  );
}
