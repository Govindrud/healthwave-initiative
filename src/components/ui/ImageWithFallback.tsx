
import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  alt: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  alt,
  className,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || '');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const defaultClassNames = "object-cover w-full h-full";
  const combinedClassNames = className ? `${defaultClassNames} ${className}` : defaultClassNames;

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      onError={handleError}
      className={combinedClassNames}
      loading="lazy"
      {...rest}
    />
  );
};

export default ImageWithFallback;
