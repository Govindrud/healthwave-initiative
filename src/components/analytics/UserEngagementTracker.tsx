import React, { useEffect } from 'react';

interface EngagementEvent {
  type: 'page_view' | 'button_click' | 'form_submit' | 'video_play' | 'download' | 'time_spent';
  page?: string;
  element?: string;
  value?: number;
  metadata?: Record<string, any>;
}

class EngagementTracker {
  private static instance: EngagementTracker;
  private events: EngagementEvent[] = [];
  private sessionStartTime: number = Date.now();
  private lastActivityTime: number = Date.now();

  static getInstance(): EngagementTracker {
    if (!EngagementTracker.instance) {
      EngagementTracker.instance = new EngagementTracker();
    }
    return EngagementTracker.instance;
  }

  trackEvent(event: EngagementEvent) {
    const timestamp = Date.now();
    const enrichedEvent = {
      ...event,
      timestamp,
      sessionId: this.getSessionId(),
      timeFromStart: timestamp - this.sessionStartTime
    };
    
    this.events.push(enrichedEvent);
    this.lastActivityTime = timestamp;
    
    // Send to analytics service (placeholder)
    console.log('Analytics Event:', enrichedEvent);
    
    // Store locally for demo purposes
    this.storeEventLocally(enrichedEvent);
  }

  trackPageView(page: string) {
    this.trackEvent({
      type: 'page_view',
      page,
      metadata: {
        referrer: document.referrer,
        userAgent: navigator.userAgent
      }
    });
  }

  trackButtonClick(buttonText: string, page?: string) {
    this.trackEvent({
      type: 'button_click',
      element: buttonText,
      page: page || window.location.pathname
    });
  }

  trackFormSubmit(formName: string, success: boolean) {
    this.trackEvent({
      type: 'form_submit',
      element: formName,
      metadata: { success }
    });
  }

  trackTimeSpent(page: string, timeSpent: number) {
    this.trackEvent({
      type: 'time_spent',
      page,
      value: timeSpent
    });
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private storeEventLocally(event: any) {
    const stored = localStorage.getItem('user_engagement_events');
    const events = stored ? JSON.parse(stored) : [];
    events.push(event);
    
    // Keep only last 100 events to prevent storage bloat
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('user_engagement_events', JSON.stringify(events));
  }

  getEngagementSummary() {
    const events = this.events;
    const pageViews = events.filter(e => e.type === 'page_view').length;
    const buttonClicks = events.filter(e => e.type === 'button_click').length;
    const formSubmissions = events.filter(e => e.type === 'form_submit').length;
    const totalTimeSpent = Date.now() - this.sessionStartTime;
    
    return {
      pageViews,
      buttonClicks,
      formSubmissions,
      totalTimeSpent: Math.round(totalTimeSpent / 1000), // in seconds
      eventsCount: events.length
    };
  }
}

const UserEngagementTracker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const tracker = EngagementTracker.getInstance();
    
    // Track initial page view
    tracker.trackPageView(window.location.pathname);
    
    // Track button clicks
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        const buttonText = button?.textContent?.trim() || 'Unknown Button';
        tracker.trackButtonClick(buttonText);
      }
    };

    // Track form submissions
    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement;
      const formName = form.name || form.id || 'Unknown Form';
      tracker.trackFormSubmit(formName, true);
    };

    // Track time spent on page
    let timeTrackingInterval: NodeJS.Timeout;
    const startTimeTracking = () => {
      const startTime = Date.now();
      timeTrackingInterval = setInterval(() => {
        const timeSpent = Date.now() - startTime;
        tracker.trackTimeSpent(window.location.pathname, timeSpent);
      }, 30000); // Track every 30 seconds
    };

    // Add event listeners
    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);
    startTimeTracking();

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
      if (timeTrackingInterval) {
        clearInterval(timeTrackingInterval);
      }
    };
  }, []);

  return <>{children}</>;
};

export default UserEngagementTracker;
export { EngagementTracker };
