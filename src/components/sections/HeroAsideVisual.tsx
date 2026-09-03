import type { ReactNode } from 'react';

type HeroAsideVisualProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/**
 * Marketing plate for PageHero `aside`: no framed field; asset sits on the
 * invert stage with `object-contain` so the 3D graphic stays centered.
 */
export function HeroAsideVisual({
  src,
  alt,
  width = 720,
  height = 480,
}: HeroAsideVisualProps): ReactNode {
  return (
    <figure className="w-full max-w-lg justify-self-center lg:max-w-none lg:justify-self-end">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="mx-auto aspect-[3/2] w-full object-contain object-center"
      />
    </figure>
  );
}
