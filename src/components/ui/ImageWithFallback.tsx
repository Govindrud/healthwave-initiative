import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = "/placeholder.svg",
  alt,
  className,
  onLoad,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Update imgSrc when src prop changes
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setHasError(false);
      setIsLoading(true);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const defaultClassNames = "object-cover w-full h-full";
  const combinedClassNames = className ? `${defaultClassNames} ${className}` : defaultClassNames;

  return (
    <>
      {isLoading && <div className="animate-pulse bg-muted w-full h-full absolute inset-0" />}
      <img 
        src={imgSrc} 
        alt={alt} 
        onError={handleError}
        onLoad={handleLoad}
        className={`${combinedClassNames} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading="lazy"
        {...rest}
      />
    </>
  );
};

export default ImageWithFallback;
