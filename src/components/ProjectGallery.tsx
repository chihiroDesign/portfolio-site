import { Project } from "@/types";

type ProjectGalleryProps = {
  images?: Project["galleryImages"];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images?.length) return null;

  return (
    <section className="mb-6 border-t border-white/5 pt-6">
      <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-white/35">Gallery</h2>
      <div className="space-y-5">
        {images.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-xl border border-white/10 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} className="block h-auto w-full" loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}