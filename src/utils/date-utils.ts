
/**
 * Format a date object into a human-readable string
 * @param date Date object or string to format
 * @returns Formatted date string (e.g., "May 15, 2023")
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(dateObj);
};

/**
 * Format a date object into a short date string
 * @param date Date object or string to format
 * @returns Short formatted date string (e.g., "15 May 2023")
 */
export const formatShortDate = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(dateObj);
};

/**
 * Format a date object into a time string
 * @param date Date object or string to format
 * @returns Time string (e.g., "2:30 PM")
 */
export const formatTime = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(dateObj);
};

/**
 * Format a date object into a date and time string
 * @param date Date object or string to format
 * @returns Date and time string (e.g., "May 15, 2023 at 2:30 PM")
 */
export const formatDateTime = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return `${formatDate(dateObj)} at ${formatTime(dateObj)}`;
};

/**
 * Get a relative time string (e.g., "2 days ago", "in 3 hours")
 * @param date Date object or string to compare to now
 * @returns Relative time string
 */
export const getRelativeTimeString = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  
  const diffInSeconds = Math.floor((dateObj.getTime() - now.getTime()) / 1000);
  const absoluteDiff = Math.abs(diffInSeconds);
  const isPast = diffInSeconds < 0;
  
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  let result: string;
  
  if (absoluteDiff < minute) {
    result = 'just now';
  } else if (absoluteDiff < hour) {
    const minutes = Math.floor(absoluteDiff / minute);
    result = `${minutes} minute${minutes === 1 ? '' : 's'}`;
  } else if (absoluteDiff < day) {
    const hours = Math.floor(absoluteDiff / hour);
    result = `${hours} hour${hours === 1 ? '' : 's'}`;
  } else if (absoluteDiff < week) {
    const days = Math.floor(absoluteDiff / day);
    result = `${days} day${days === 1 ? '' : 's'}`;
  } else if (absoluteDiff < month) {
    const weeks = Math.floor(absoluteDiff / week);
    result = `${weeks} week${weeks === 1 ? '' : 's'}`;
  } else if (absoluteDiff < year) {
    const months = Math.floor(absoluteDiff / month);
    result = `${months} month${months === 1 ? '' : 's'}`;
  } else {
    const years = Math.floor(absoluteDiff / year);
    result = `${years} year${years === 1 ? '' : 's'}`;
  }
  
  return isPast ? `${result} ago` : `in ${result}`;
};
