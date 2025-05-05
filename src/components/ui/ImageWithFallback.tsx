
import React, { useState, useEffect } from 'react';

// Default placeholder if no fallback is provided
const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className = "",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(0);

  // Use the provided fallback or default to the placeholder
  const finalFallbackSrc = fallbackSrc || DEFAULT_PLACEHOLDER;

  useEffect(() => {
    // Reset state when src changes
    setImgSrc(src);
    setHasError(false);
    setAttempt(0);
  }, [src]);

  const handleError = () => {
    console.log(`Image error loading: ${imgSrc}, attempt: ${attempt}`);
    
    const pathVariants = [
      // Try with /images/ path
      (filename: string) => `/images/${filename}`,
      // Try with /public/images/ path
      (filename: string) => `/public/images/${filename}`,
      // Try just the filename at root
      (filename: string) => `/${filename}`,
      // Try with public prefix
      (filename: string) => `/public/${filename}`,
      // Use unsplash placeholder as last resort
      () => finalFallbackSrc
    ];
    
    if (attempt < pathVariants.length - 1) {
      // Extract filename from path
      const filename = imgSrc.split('/').pop() || '';
      const nextAttempt = attempt + 1;
      const nextPath = pathVariants[nextAttempt](filename);
      
      console.log(`Trying next path (attempt ${nextAttempt}): ${nextPath}`);
      setImgSrc(nextPath);
      setAttempt(nextAttempt);
    } else {
      // Last resort: use fallback
      console.log(`Using fallback for ${src}: ${finalFallbackSrc}`);
      setImgSrc(finalFallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
