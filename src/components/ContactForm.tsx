'use client';

import { useEffect } from 'react';

interface ContactFormProps {
  dark?: boolean;
}

export default function ContactForm({ dark = false }: ContactFormProps) {
  const labelClass = dark ? 'text-sm font-semibold text-white/90' : 'text-sm font-semibold text-zinc-900/90';
  const fieldClass = dark
    ? 'rounded-xl border border-white/20 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/45 transition-all focus:border-[var(--color-accent)] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30'
    : 'rounded-xl border border-black/15 bg-black/[0.025] px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-900/40 transition-all focus:border-[var(--color-accent)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20';
  const submitClass =
    'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] px-7 py-3 text-[0.9375rem] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';
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
        const response = await fetch('/contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
        });

        if (!response.ok) {
          throw new Error(`Form submission failed with status ${response.status}`);
        }

        if (status) {
          status.textContent = "Thank you—your project details have been received. I'll review your inquiry and respond within one business day.";
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="business" className={labelClass}>
            Company or Business
          </label>
          <input id="business" name="business" type="text" autoComplete="organization" className={fieldClass} placeholder="Your company (optional)" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="current-website" className={labelClass}>
            Current Website
          </label>
          <input id="current-website" name="current_website" type="text" autoComplete="url" className={fieldClass} placeholder="https://yourwebsite.com (if any)" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="current-provider" className={labelClass}>
            Current Provider or Platform
          </label>
          <select id="current-provider" name="current_provider" className={fieldClass}>
            <option value="Not sure">Not sure</option>
            <option value="Cloudways">Cloudways</option>
            <option value="Hostinger">Hostinger</option>
            <option value="GoDaddy">GoDaddy</option>
            <option value="cPanel or WHM">cPanel or WHM</option>
            <option value="WordPress">WordPress</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="project-type" className={labelClass}>
            Project Type
          </label>
          <select id="project-type" name="project_type" className={fieldClass}>
            <option value="New WordPress Website">New WordPress Website</option>
            <option value="Website Redesign">Website Redesign</option>
            <option value="Elementor Development">Elementor Development</option>
            <option value="Landing Page">Landing Page</option>
            <option value="Dynamic Content / ACF / JetEngine">Dynamic Content / ACF / JetEngine</option>
            <option value="Custom WordPress Functionality">Custom WordPress Functionality</option>
            <option value="Web System / Admin Dashboard">Web System / Admin Dashboard</option>
            <option value="Web Tool or Calculator">Web Tool or Calculator</option>
            <option value="Hosting or Website Migration">Hosting or Website Migration</option>
            <option value="Domain and DNS Configuration">Domain and DNS Configuration</option>
            <option value="Business Email or Form Delivery">Business Email or Form Delivery</option>
            <option value="SSL or Website Connection Issue">SSL or Website Connection Issue</option>
            <option value="Maintenance or Support">Maintenance or Support</option>
            <option value="Agency Development Support">Agency Development Support</option>
            <option value="Other">Other</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className={labelClass}>
            Target Timeline
          </label>
          <select id="timeline" name="timeline" className={fieldClass}>
            <option value="As soon as possible">As soon as possible</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="1-3 months">1–3 months</option>
            <option value="Flexible / not sure yet">Flexible / not sure yet</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className={labelClass}>
            Estimated Budget
          </label>
          <select id="budget" name="budget" className={fieldClass}>
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1,500">$500 – $1,500</option>
            <option value="$1,500 - $5,000">$1,500 – $5,000</option>
            <option value="$5,000+">$5,000+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Project Description <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-describedby="message-error"
          className={`resize-none ${fieldClass}`}
          placeholder="Briefly describe what you need, the problem you are trying to solve, important features, and any existing website or system involved."
        />
        <p id="message-error" className="hidden text-xs" style={{ color: errorColor }} data-error-for="message" role="alert">
          Please enter a project description.
        </p>
      </div>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
        <button type="submit" className={`${submitClass} w-full sm:w-auto`} data-submit-btn>
          Send Project Details
        </button>
        <p className="text-sm" role="status" aria-live="polite" data-form-status style={dark ? { color: 'rgba(255,255,255,0.6)' } : undefined} />
      </div>

      <p className="text-xs" style={dark ? { color: 'rgba(255,255,255,0.5)' } : { color: 'var(--text-secondary)' }}>
        Your information will only be used to review and respond to your project inquiry.
      </p>
    </form>
  );
}
