
import React, { useState, useEffect } from 'react';

// Default placeholder if no fallback is provided
const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';

// Define reliable fallbacks for common images
const COMMON_IMAGES = {
  'happy-people-1.jpg': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'happy-people-2.jpg': 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'happy-people-3.jpg': 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'about-team.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'approach.jpg': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'user-placeholder.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
};

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

  // Get filename from path for common image lookup
  const getFilename = (path: string) => path.split('/').pop() || '';
  
  // Check if image path matches any known common image
  const getCommonImageFallback = (path: string) => {
    const filename = getFilename(path);
    return Object.entries(COMMON_IMAGES).find(([key]) => filename === key)?.[1];
  };

  // Use the provided fallback or find a common image fallback or default to the placeholder
  const getFinalFallbackSrc = () => {
    return fallbackSrc || getCommonImageFallback(src) || DEFAULT_PLACEHOLDER;
  };

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
      // Try the common image map
      (filename: string) => getCommonImageFallback(filename) || '',
      // Use final fallback as last resort
      () => getFinalFallbackSrc()
    ];
    
    if (attempt < pathVariants.length - 1) {
      // Extract filename from path
      const filename = imgSrc.split('/').pop() || '';
      const nextAttempt = attempt + 1;
      const nextPath = pathVariants[nextAttempt](filename);
      
      if (nextPath) {
        console.log(`Trying next path (attempt ${nextAttempt}): ${nextPath}`);
        setImgSrc(nextPath);
        setAttempt(nextAttempt);
      } else {
        // If next path is empty, skip to fallback
        console.log(`Using fallback for ${src}: ${getFinalFallbackSrc()}`);
        setImgSrc(getFinalFallbackSrc());
        setHasError(true);
      }
    } else {
      // Last resort: use fallback
      console.log(`Using fallback for ${src}: ${getFinalFallbackSrc()}`);
      setImgSrc(getFinalFallbackSrc());
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
