
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export function useScrollToHash() {
  const { hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      
      if (element) {
        // Wait a bit for the page to render completely
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [hash]);
}

export function useScrollTrigger(callback: () => void, threshold: number = 100) {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        callback();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, threshold]);
}

export default function usePageScrolling() {
  useScrollToTop();
  useScrollToHash();
}
