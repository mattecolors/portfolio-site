import type { RobloxImages } from "@/data/types";
import { ImageFrame } from "../ui/ImageFrame";

interface RobloxGalleryProps {
  images: RobloxImages;
}

export function RobloxGallery({ images }: RobloxGalleryProps) {
  return (
    <div className="space-y-4">
      <ImageFrame
        src={images.hero}
        alt="Roblox atmospheric build, hero"
        aspectRatio="aspect-[21/9]"
        priority
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {images.features.map((src, i) => (
          <ImageFrame
            key={src}
            src={src}
            alt={`Roblox build showcase ${i + 1}`}
            aspectRatio="aspect-[4/3]"
          />
        ))}
      </div>
    </div>
  );
}
