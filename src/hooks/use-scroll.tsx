
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  // Safety check to only run when inside Router context
  let isRouterAvailable = true;
  try {
    // Just checking if we have access to the router context
    // without actually using the hook result yet
    useLocation();
  } catch (e) {
    isRouterAvailable = false;
  }
  
  // Only call useLocation if we know we're in a Router context
  const location = isRouterAvailable ? useLocation() : null;
  const pathname = location?.pathname || "";
  
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
    // Just checking if we have access to the router context
    // without actually using the hook result yet
    useLocation();
  } catch (e) {
    isRouterAvailable = false;
  }
  
  // Only call useLocation if we know we're in a Router context
  const location = isRouterAvailable ? useLocation() : null;
  const hash = location?.hash || "";
  
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
    // This is just a check, we're not using the result
    // This line is important - we need to check if useLocation is available
    // without actually calling it if it will throw an error
    useLocation();
  } catch (e) {
    isRouterAvailable = false;
    console.warn("usePageScrolling: Router context not available, some scroll features disabled");
    return; // Exit early if Router context is not available
  }
  
  // If we get here, we know we can safely use the router hooks
  useScrollToTop();
  useScrollToHash();
}
