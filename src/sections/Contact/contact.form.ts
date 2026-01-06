// contact.form.ts - Contact form handling logic
import { supabaseClient } from '@services/supabase.client';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const contactForm = {
  onModalOpen: null as (() => void) | null,

  init(onModalOpen?: () => void): void {
    if (onModalOpen) this.onModalOpen = onModalOpen;
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmit(form);
    });
  },

  async handleSubmit(form: HTMLFormElement): Promise<void> {
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const statusEl = document.getElementById('form-status');

    if (!submitBtn || !statusEl) return;

    // Get form data
    const formData = new FormData(form);
    const data: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    // Validate
    if (!this.validate(data)) {
      this.showStatus(statusEl, 'Please fill in all fields correctly.', 'error');
      return;
    }

    // Trigger Modal
    if (this.onModalOpen) {
      this.onModalOpen();
    }

    // Reset button state immediately as the modal takes over
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <span>Send Message</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>
    `;
  },

  validate(data: FormData): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name.trim() || data.name.length < 2) return false;
    if (!emailRegex.test(data.email)) return false;
    if (!data.message.trim() || data.message.length < 10) return false;

    return true;
  },

  async submitToSupabase(data: FormData): Promise<void> {
    const client = supabaseClient.getClient();
    if (!client) {
      // Fallback: just log if no Supabase
      console.log('[contact.form] Form data:', data);
      return;
    }

    const { error } = await client.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      message: data.message,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;
  },

  showStatus(element: HTMLElement, message: string, type: 'success' | 'error'): void {
    element.textContent = message;
    element.className = `mt-4 text-center font-mono text-sm ${type === 'success' ? 'text-green-400' : 'text-red-400'}`;
    element.classList.remove('hidden');

    setTimeout(() => {
      element.classList.add('hidden');
    }, 5000);
  },
};
