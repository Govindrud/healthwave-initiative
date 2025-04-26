
import * as React from "react"

const MOBILE_BREAKPOINT = 1024 // Increasing from 768 to better handle tablets

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Set CSS variable for vh to handle mobile browser address bar
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      setVhVariable();
    };

    // Initial check
    handleResize();

    // Create the media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Modern approach with addEventListener
    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize);
    } 
    // Fallback for older browsers
    else if ((mql as any).addListener) {
      (mql as any).addListener(handleResize);
    } 
    // Direct window resize as last resort
    else {
      window.addEventListener('resize', handleResize);
    }

    // Set the vh variable when page loads
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    window.addEventListener('orientationchange', setVhVariable);

    // Cleanup
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleResize);
      } else if ((mql as any).removeListener) {
        (mql as any).removeListener(handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
      
      window.removeEventListener('resize', setVhVariable);
      window.removeEventListener('orientationchange', setVhVariable);
    };
  }, []);

  return !!isMobile;
}

// Add platform detection hooks
export function useIsPlatform() {
  const [platform, setPlatform] = React.useState({
    isIOS: false,
    isAndroid: false,
    isMacOS: false,
    isWindows: false,
    isMobile: false,
    isDesktop: false,
    isSafari: false
  });

  React.useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    
    // Enhanced mobile detection
    // Check common mobile indicators
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    
    // Additional check for touch screen devices
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || 
                          (window as any).DocumentTouch && document instanceof (window as any).DocumentTouch;
    
    // Combined mobile detection
    const isMobile = isMobileDevice || hasTouchScreen || window.innerWidth < 768;
    
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    const isAndroid = /android/i.test(userAgent);
    const isMacOS = /Mac/.test(userAgent) && !isIOS;
    const isWindows = /Win/.test(userAgent);
    const isDesktop = !isMobile;
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

    setPlatform({
      isIOS,
      isAndroid,
      isMacOS,
      isWindows,
      isMobile,
      isDesktop,
      isSafari
    });
  }, []);

  return platform;
}
