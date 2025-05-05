
import React, { useState, useEffect } from 'react';
import ImageWithFallback from './ui/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';

type Slide = {
  image: string;
  caption: string;
  fallback?: string;
};

interface ImageSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

const ImageSlider = ({ slides, autoPlayInterval = 5000 }: ImageSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle auto-play
  useEffect(() => {
    if (!slides.length) return;
    
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    
    return () => clearInterval(intervalId);
  }, [slides.length, autoPlayInterval]);

  // Handle manual navigation
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // If there are no slides, show a placeholder
  if (!slides.length) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <ErrorBoundary key={index}>
          <div
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <ImageWithFallback
              src={slide.image}
              fallbackSrc={slide.fallback}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <p className="text-lg font-medium">{slide.caption}</p>
            </div>
          </div>
        </ErrorBoundary>
      ))}
      
      {/* Navigation arrows */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition-colors"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition-colors"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
