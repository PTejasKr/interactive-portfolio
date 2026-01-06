// analytics.service.ts - Analytics and interaction tracking
import { supabaseClient } from './supabase.client';

interface AnalyticsEvent {
  event_type: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

interface InteractionEvent {
  interaction_type: string;
  sound_triggered: boolean;
  timestamp: string;
  metadata: Record<string, unknown>;
}

class AnalyticsService {
  private queue: AnalyticsEvent[] = [];
  private flushInterval: number = 0;
  private enabled: boolean = true;

  init(): void {
    // Flush queue every 30 seconds
    this.flushInterval = window.setInterval(() => this.flush(), 30000);

    // Flush on page unload
    window.addEventListener('beforeunload', () => this.flush());

    console.log('[Analytics] Initialized');
  }

  disable(): void {
    this.enabled = false;
  }

  enable(): void {
    this.enabled = true;
  }

  track(eventType: string, metadata: Record<string, unknown> = {}): void {
    if (!this.enabled) return;

    this.queue.push({
      event_type: eventType,
      timestamp: new Date().toISOString(),
      metadata,
    });
  }

  trackInteraction(
    type: string,
    soundTriggered: boolean = false,
    metadata: Record<string, unknown> = {}
  ): void {
    if (!this.enabled) return;

    const event: InteractionEvent = {
      interaction_type: type,
      sound_triggered: soundTriggered,
      timestamp: new Date().toISOString(),
      metadata,
    };

    // Send immediately for interactions
    this.sendInteraction(event);
  }

  trackPageView(path: string): void {
    this.track('page_view', { path });
  }

  trackSectionView(sectionId: string): void {
    this.track('section_view', { section: sectionId });
  }

  trackMascotInteraction(action: string, emotion?: string): void {
    this.trackInteraction('mascot', true, { action, emotion });
  }

  trackSkillView(skillName: string): void {
    this.track('skill_view', { skill: skillName });
  }

  trackProjectClick(projectName: string): void {
    this.track('project_click', { project: projectName });
  }

  trackContactSubmit(success: boolean): void {
    this.track('contact_submit', { success });
  }

  private async flush(): Promise<void> {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    const client = supabaseClient.getClient();
    if (!client) {
      console.log('[Analytics] Events (no Supabase):', events);
      return;
    }

    try {
      await client.from('analytics').insert(events);
    } catch (error) {
      console.error('[Analytics] Flush failed:', error);
      // Re-queue failed events
      this.queue = [...events, ...this.queue];
    }
  }

  private async sendInteraction(event: InteractionEvent): Promise<void> {
    const client = supabaseClient.getClient();
    if (!client) {
      console.log('[Analytics] Interaction:', event);
      return;
    }

    try {
      await client.from('interactions').insert(event);
    } catch (error) {
      console.error('[Analytics] Interaction send failed:', error);
    }
  }

  destroy(): void {
    clearInterval(this.flushInterval);
    this.flush();
  }
}

export const analyticsService = new AnalyticsService();
