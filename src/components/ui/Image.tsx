
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const Image = ({ src, alt, fallbackSrc = "https://images.unsplash.com/photo-1516824711773-9c3b3b4b6bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", ...props }: ImageProps) => {
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(src);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return <img src={imgSrc} alt={alt} onError={handleError} {...props} />;
};

export default Image;
