
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  // Safety check to only run when inside Router context
  let isRouterAvailable = true;
  try {
    useLocation();
  } catch (e) {
    isRouterAvailable = false;
  }
  
  const { pathname } = isRouterAvailable ? useLocation() : { pathname: "" };
  
  useEffect(() => {
    if (isRouterAvailable) {
      window.scrollTo(0, 0);
    }
  }, [pathname, isRouterAvailable]);
}

export function useScrollToHash() {
  // Safety check to only run when inside Router context
  let isRouterAvailable = true;
  try {
    useLocation();
  } catch (e) {
    isRouterAvailable = false;
  }
  
  const { hash } = isRouterAvailable ? useLocation() : { hash: "" };
  
  useEffect(() => {
    if (isRouterAvailable && hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      
      if (element) {
        // Wait a bit for the page to render completely
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [hash, isRouterAvailable]);
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
  // Only try to use router hooks if inside Router context
  let isRouterAvailable = true;
  try {
    useLocation();
  } catch (e) {
    isRouterAvailable = false;
    console.warn("usePageScrolling: Router context not available, some scroll features disabled");
    return; // Exit early if Router context is not available
  }
  
  // Only use these hooks if Router is available
  if (isRouterAvailable) {
    useScrollToTop();
    useScrollToHash();
  }
}
