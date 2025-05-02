
import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = "/placeholder.svg",
  alt,
  className = "",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(0);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setAttempt(0);
  }, [src]);

  const handleError = () => {
    console.log(`Image error loading: ${imgSrc}, attempt: ${attempt}`);
    
    if (attempt === 0) {
      // First try: if path doesn't include /images/, try adding it
      if (!imgSrc.includes('/images/')) {
        const filename = imgSrc.split('/').pop();
        setImgSrc(`/images/${filename}`);
        setAttempt(1);
        return;
      }
      setAttempt(1);
    } 
    else if (attempt === 1) {
      // Second try: if path doesn't include /public/, try adding it
      if (!imgSrc.includes('/public/')) {
        const filename = imgSrc.split('/').pop();
        setImgSrc(`/public/images/${filename}`);
        setAttempt(2);
        return;
      }
      setAttempt(2);
    } 
    else if (attempt === 2) {
      // Third try: try just the filename
      const filename = imgSrc.split('/').pop();
      if (filename) {
        setImgSrc(`/${filename}`);
        setAttempt(3);
        return;
      }
      setAttempt(3);
    }
    else {
      // Last resort: use fallback
      setImgSrc(fallbackSrc);
      setHasError(true);
      console.log(`Using fallback for ${src}`);
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
