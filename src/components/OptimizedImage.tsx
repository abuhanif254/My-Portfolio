import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { cn } from '../lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  effect?: 'blur' | 'black-and-white' | 'opacity';
  priority?: boolean;
}

/**
 * A wrapper around LazyLoadImage that provides consistent styling and optimization.
 * For external images like Picsum, it attempts to use responsive sizes if possible.
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  effect = 'blur',
  priority = false 
}: OptimizedImageProps) {
  
  // If it's a Picsum image, we can generate a srcSet for responsive loading
  const isPicsum = src.includes('picsum.photos');
  
  let srcSet = undefined;
  if (isPicsum) {
    const baseUrl = src.split('?')[0];
    srcSet = `
      ${baseUrl}/400/300 400w,
      ${baseUrl}/800/600 800w,
      ${baseUrl}/1200/900 1200w,
      ${baseUrl}/1600/1200 1600w
    `;
  }

  return (
    <div className={cn("relative overflow-hidden bg-zinc-100 dark:bg-zinc-800", className)}>
      <LazyLoadImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        effect={priority ? undefined : effect}
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={cn(
          "w-full h-full object-cover transition-transform duration-500 hover:scale-110",
          priority ? "opacity-100" : ""
        )}
        wrapperClassName="w-full h-full block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
