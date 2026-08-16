'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

interface ContactFormProps {
  dark?: boolean;
}

export default function ContactForm({ dark = false }: ContactFormProps) {
  const labelClass = dark ? 'text-sm font-semibold text-white/90' : 'text-sm font-semibold text-[var(--ink-950)]';
  const fieldClass = dark
    ? 'rounded-[var(--radius-sm)] border border-white/20 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/45 transition-all focus:border-[var(--accent)] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30'
    : 'rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-[var(--paper-050)] px-4 py-2.5 text-sm text-[var(--ink-950)] placeholder:text-[var(--ink-400)] transition-all focus:border-[var(--accent)] focus:bg-[var(--paper-000)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20';
  const submitClass =
    'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--ink-950)] px-7 py-3 text-[0.9375rem] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';
  const errorColor = dark ? 'var(--color-error-dark)' : 'var(--color-error)';
  const successColor = dark ? 'var(--color-success-dark)' : 'var(--color-success)';

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
    if (!form) return;

    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const submitBtn = form.querySelector<HTMLButtonElement>('[data-submit-btn]');
    const formErrorColor = form.dataset.errorColor || 'var(--color-error)';
    const formSuccessColor = form.dataset.successColor || 'var(--color-success)';
    let isSubmitting = false;

    const setError = (name: string, show: boolean) => {
      const field = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
      const input = form.querySelector<HTMLElement>(`#${name}`);
      field?.classList.toggle('hidden', !show);
      input?.setAttribute('aria-invalid', show ? 'true' : 'false');
    };

    const validate = () => {
      let valid = true;
      const name = form.querySelector<HTMLInputElement>('#name');
      const email = form.querySelector<HTMLInputElement>('#email');
      const message = form.querySelector<HTMLTextAreaElement>('#message');

      if (!name?.value.trim()) {
        setError('name', true);
        valid = false;
      } else {
        setError('name', false);
      }

      const emailValid = !!email?.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
      if (!emailValid) {
        setError('email', true);
        valid = false;
      } else {
        setError('email', false);
      }

      if (!message?.value.trim()) {
        setError('message', true);
        valid = false;
      } else {
        setError('message', false);
      }

      return valid;
    };

    const onSubmit = async (e: SubmitEvent) => {
      e.preventDefault();

      if (isSubmitting) return;

      if (!validate()) {
        if (status) {
          status.textContent = 'Please fix the highlighted fields.';
          status.style.color = formErrorColor;
        }
        return;
      }

      isSubmitting = true;
      submitBtn?.setAttribute('disabled', 'true');
      if (status) {
        status.textContent = 'Sending...';
        status.style.color = 'var(--color-muted)';
      }

      try {
        const formData = new FormData(form);
        const body = new URLSearchParams(formData as unknown as Record<string, string>).toString();

        // Best-effort log to the Google Sheet — fire-and-forget. `no-cors` makes the
        // response opaque (Apps Script doesn't send CORS headers), so we can't tell if it
        // succeeded; that's fine, the email below is the source of truth for delivery.
        if (siteConfig.sheetsWebhookUrl) {
          fetch(siteConfig.sheetsWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
          }).catch(() => {});
        }

        const response = await fetch('/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });

        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`);
        }

        if (status) {
          status.textContent = "Thank you — your message has been received. I'll respond within one business day.";
          status.style.color = formSuccessColor;
        }
        form.reset();
      } catch {
        if (status) {
          status.textContent = 'Something went wrong. Please email me directly instead.';
          status.style.color = formErrorColor;
        }
      } finally {
        isSubmitting = false;
        submitBtn?.removeAttribute('disabled');
      }
    };

    form.addEventListener('submit', onSubmit);
    return () => form.removeEventListener('submit', onSubmit);
  }, []);

  return (
    <form
      name="contact"
      method="POST"
      className="reveal flex flex-col gap-4"
      data-reveal
      data-contact-form
      data-error-color={errorColor}
      data-success-color={successColor}
      noValidate
    >
      <div className="hidden">
        <label>
          Company (leave this field blank)
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" aria-describedby="name-error" className={fieldClass} placeholder="Your name" />
          <p id="name-error" className="hidden text-xs" style={{ color: errorColor }} data-error-for="name" role="alert">
            Please enter your name.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" aria-describedby="email-error" className={fieldClass} placeholder="you@company.com" />
          <p id="email-error" className="hidden text-xs" style={{ color: errorColor }} data-error-for="email" role="alert">
            Please enter a valid email.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className={labelClass}>
          Phone Number
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="Optional" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-describedby="message-error"
          className={`resize-none ${fieldClass}`}
          placeholder="Tell me a bit about the role or project, and how I can help."
        />
        <p id="message-error" className="hidden text-xs" style={{ color: errorColor }} data-error-for="message" role="alert">
          Please enter a project description.
        </p>
      </div>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
        <button type="submit" className={`${submitClass} w-full sm:w-auto`} data-submit-btn>
          Send Message
        </button>
        <p className="text-sm" role="status" aria-live="polite" data-form-status style={dark ? { color: 'rgba(255,255,255,0.6)' } : undefined} />
      </div>

      <p className="text-xs" style={dark ? { color: 'rgba(255,255,255,0.5)' } : { color: 'var(--text-secondary)' }}>
        Your information will only be used to review and respond to your message.
      </p>
    </form>
  );
}
