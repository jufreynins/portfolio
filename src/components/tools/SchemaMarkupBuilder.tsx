'use client';

import { useMemo, useState } from 'react';
import {
  SCHEMA_TYPES,
  REQUIRED_FIELDS,
  EXAMPLES,
  buildJsonLd,
  serializeForScript,
  type SchemaType,
  type SimpleFields,
  type FaqItem,
  type CrumbItem,
} from '@/lib/schema/utils';
import Field, { fieldClass, fieldStyle } from '@/components/tools/Field';
import CopyButton from '@/components/tools/CopyButton';
import DownloadButton from '@/components/tools/DownloadButton';
import ResetButton from '@/components/tools/ResetButton';

function genId() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const EMPTY_FIELDS: SimpleFields = {};

export default function SchemaMarkupBuilder() {
  const [type, setType] = useState<SchemaType>('Organization');
  const [fields, setFields] = useState<SimpleFields>(EMPTY_FIELDS);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([{ id: genId(), question: '', answer: '' }]);
  const [crumbItems, setCrumbItems] = useState<CrumbItem[]>([
    { id: genId(), name: '', url: '' },
    { id: genId(), name: '', url: '' },
  ]);

  function setField(key: string, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function loadExample() {
    const ex = EXAMPLES[type];
    setFields(ex.fields);
    if (ex.faq) setFaqItems(ex.faq);
    if (ex.crumbs) setCrumbItems(ex.crumbs);
  }

  function resetAll() {
    setFields({});
    setFaqItems([{ id: genId(), question: '', answer: '' }]);
    setCrumbItems([
      { id: genId(), name: '', url: '' },
      { id: genId(), name: '', url: '' },
    ]);
  }

  const jsonLd = useMemo(() => buildJsonLd(type, fields, faqItems, crumbItems), [type, fields, faqItems, crumbItems]);
  const scriptText = useMemo(() => `<script type="application/ld+json">\n${serializeForScript(jsonLd)}\n</script>`, [jsonLd]);

  const required = REQUIRED_FIELDS[type];
  const completeCount =
    type === 'FAQPage'
      ? faqItems.filter((f) => f.question.trim() && f.answer.trim()).length
      : type === 'BreadcrumbList'
        ? crumbItems.filter((c) => c.name.trim()).length
        : required.filter((k) => (fields[k] ?? '').trim()).length;
  const totalCount = type === 'FAQPage' ? Math.max(faqItems.length, 1) : type === 'BreadcrumbList' ? Math.max(crumbItems.length, 1) : Math.max(required.length, 1);
  const completePct = Math.round((completeCount / totalCount) * 100);

  function addFaq() {
    setFaqItems((prev) => [...prev, { id: genId(), question: '', answer: '' }]);
  }
  function removeFaq(id: string) {
    setFaqItems((prev) => (prev.length > 1 ? prev.filter((f) => f.id !== id) : prev));
  }
  function moveFaq(index: number, dir: -1 | 1) {
    setFaqItems((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function addCrumb() {
    setCrumbItems((prev) => [...prev, { id: genId(), name: '', url: '' }]);
  }
  function removeCrumb(id: string) {
    setCrumbItems((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
  }
  function moveCrumb(index: number, dir: -1 | 1) {
    setCrumbItems((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
      {/* Left: guided fields */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Schema type">
          {SCHEMA_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              aria-pressed={type === t.id}
              className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-colors"
              style={type === t.id ? { background: 'var(--tool-accent)', color: '#fff' } : { border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl border px-3.5 py-2.5" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Completeness
          </span>
          <span className="font-mono text-sm font-bold" style={{ color: completePct === 100 ? 'var(--color-success)' : 'var(--tool-accent)' }}>
            {completeCount}/{totalCount} required
          </span>
        </div>

        {type === 'Organization' && (
          <div className="flex flex-col gap-3">
            <Field label="Organization name" htmlFor="s-name" required>
              <input id="s-name" className={fieldClass} style={fieldStyle} value={fields.name ?? ''} onChange={(e) => setField('name', e.target.value)} placeholder="Acme Co." />
            </Field>
            <Field label="Website URL" htmlFor="s-url" required>
              <input id="s-url" className={fieldClass} style={fieldStyle} value={fields.url ?? ''} onChange={(e) => setField('url', e.target.value)} placeholder="https://example.com" />
            </Field>
            <Field label="Logo URL" htmlFor="s-logo">
              <input id="s-logo" className={fieldClass} style={fieldStyle} value={fields.logo ?? ''} onChange={(e) => setField('logo', e.target.value)} placeholder="https://example.com/logo.png" />
            </Field>
            <Field label="Description" htmlFor="s-desc">
              <textarea id="s-desc" rows={2} className={fieldClass} style={fieldStyle} value={fields.description ?? ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone" htmlFor="s-tel">
                <input id="s-tel" className={fieldClass} style={fieldStyle} value={fields.telephone ?? ''} onChange={(e) => setField('telephone', e.target.value)} />
              </Field>
              <Field label="Email" htmlFor="s-email">
                <input id="s-email" className={fieldClass} style={fieldStyle} value={fields.email ?? ''} onChange={(e) => setField('email', e.target.value)} />
              </Field>
            </div>
            <Field label="Social profile URLs" htmlFor="s-sameas" hint="Comma-separated (LinkedIn, Facebook, etc.)">
              <input id="s-sameas" className={fieldClass} style={fieldStyle} value={fields.sameAs ?? ''} onChange={(e) => setField('sameAs', e.target.value)} />
            </Field>
          </div>
        )}

        {type === 'LocalBusiness' && (
          <div className="flex flex-col gap-3">
            <Field label="Business name" htmlFor="s-name" required>
              <input id="s-name" className={fieldClass} style={fieldStyle} value={fields.name ?? ''} onChange={(e) => setField('name', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Website URL" htmlFor="s-url" required>
                <input id="s-url" className={fieldClass} style={fieldStyle} value={fields.url ?? ''} onChange={(e) => setField('url', e.target.value)} />
              </Field>
              <Field label="Phone" htmlFor="s-tel" required>
                <input id="s-tel" className={fieldClass} style={fieldStyle} value={fields.telephone ?? ''} onChange={(e) => setField('telephone', e.target.value)} />
              </Field>
            </div>
            <Field label="Street address" htmlFor="s-street" required>
              <input id="s-street" className={fieldClass} style={fieldStyle} value={fields.street ?? ''} onChange={(e) => setField('street', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="City" htmlFor="s-city" required>
                <input id="s-city" className={fieldClass} style={fieldStyle} value={fields.city ?? ''} onChange={(e) => setField('city', e.target.value)} />
              </Field>
              <Field label="State / Region" htmlFor="s-region" required>
                <input id="s-region" className={fieldClass} style={fieldStyle} value={fields.region ?? ''} onChange={(e) => setField('region', e.target.value)} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Postal code" htmlFor="s-postal" required>
                <input id="s-postal" className={fieldClass} style={fieldStyle} value={fields.postal ?? ''} onChange={(e) => setField('postal', e.target.value)} />
              </Field>
              <Field label="Country code" htmlFor="s-country" required hint="e.g. US">
                <input id="s-country" className={fieldClass} style={fieldStyle} value={fields.country ?? ''} onChange={(e) => setField('country', e.target.value)} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Opening hours" htmlFor="s-hours" hint="e.g. Mo-Fr 09:00-17:00">
                <input id="s-hours" className={fieldClass} style={fieldStyle} value={fields.openingHours ?? ''} onChange={(e) => setField('openingHours', e.target.value)} />
              </Field>
              <Field label="Price range" htmlFor="s-price" hint="e.g. $$">
                <input id="s-price" className={fieldClass} style={fieldStyle} value={fields.priceRange ?? ''} onChange={(e) => setField('priceRange', e.target.value)} />
              </Field>
            </div>
          </div>
        )}

        {type === 'Service' && (
          <div className="flex flex-col gap-3">
            <Field label="Service name" htmlFor="s-name" required>
              <input id="s-name" className={fieldClass} style={fieldStyle} value={fields.name ?? ''} onChange={(e) => setField('name', e.target.value)} />
            </Field>
            <Field label="Provider (organization or person name)" htmlFor="s-provider" required>
              <input id="s-provider" className={fieldClass} style={fieldStyle} value={fields.provider ?? ''} onChange={(e) => setField('provider', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Service type" htmlFor="s-type" hint="e.g. Web Development">
                <input id="s-type" className={fieldClass} style={fieldStyle} value={fields.serviceType ?? ''} onChange={(e) => setField('serviceType', e.target.value)} />
              </Field>
              <Field label="Area served" htmlFor="s-area">
                <input id="s-area" className={fieldClass} style={fieldStyle} value={fields.areaServed ?? ''} onChange={(e) => setField('areaServed', e.target.value)} />
              </Field>
            </div>
            <Field label="Description" htmlFor="s-desc">
              <textarea id="s-desc" rows={2} className={fieldClass} style={fieldStyle} value={fields.description ?? ''} onChange={(e) => setField('description', e.target.value)} />
            </Field>
            <Field label="Service page URL" htmlFor="s-url">
              <input id="s-url" className={fieldClass} style={fieldStyle} value={fields.url ?? ''} onChange={(e) => setField('url', e.target.value)} />
            </Field>
          </div>
        )}

        {type === 'Person' && (
          <div className="flex flex-col gap-3">
            <Field label="Full name" htmlFor="s-name" required>
              <input id="s-name" className={fieldClass} style={fieldStyle} value={fields.name ?? ''} onChange={(e) => setField('name', e.target.value)} />
            </Field>
            <Field label="Job title" htmlFor="s-job">
              <input id="s-job" className={fieldClass} style={fieldStyle} value={fields.jobTitle ?? ''} onChange={(e) => setField('jobTitle', e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Website URL" htmlFor="s-url">
                <input id="s-url" className={fieldClass} style={fieldStyle} value={fields.url ?? ''} onChange={(e) => setField('url', e.target.value)} />
              </Field>
              <Field label="Email" htmlFor="s-email">
                <input id="s-email" className={fieldClass} style={fieldStyle} value={fields.email ?? ''} onChange={(e) => setField('email', e.target.value)} />
              </Field>
            </div>
            <Field label="Social profile URLs" htmlFor="s-sameas" hint="Comma-separated">
              <input id="s-sameas" className={fieldClass} style={fieldStyle} value={fields.sameAs ?? ''} onChange={(e) => setField('sameAs', e.target.value)} />
            </Field>
          </div>
        )}

        {type === 'FAQPage' && (
          <div className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <div key={item.id} className="flex flex-col gap-2 rounded-xl border p-3.5" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                    Question {i + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <button type="button" disabled={i === 0} onClick={() => moveFaq(i, -1)} aria-label="Move up" className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--tool-accent)' }}>
                      ↑
                    </button>
                    <button type="button" disabled={i === faqItems.length - 1} onClick={() => moveFaq(i, 1)} aria-label="Move down" className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--tool-accent)' }}>
                      ↓
                    </button>
                    <button type="button" onClick={() => removeFaq(item.id)} disabled={faqItems.length <= 1} className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--color-error)' }}>
                      Remove
                    </button>
                  </div>
                </div>
                <input
                  className={fieldClass}
                  style={fieldStyle}
                  value={item.question}
                  onChange={(e) => setFaqItems((prev) => prev.map((f) => (f.id === item.id ? { ...f, question: e.target.value } : f)))}
                  placeholder="Question"
                  aria-label={`Question ${i + 1} text`}
                />
                <textarea
                  rows={2}
                  className={fieldClass}
                  style={fieldStyle}
                  value={item.answer}
                  onChange={(e) => setFaqItems((prev) => prev.map((f) => (f.id === item.id ? { ...f, answer: e.target.value } : f)))}
                  placeholder="Answer"
                  aria-label={`Answer ${i + 1} text`}
                />
              </div>
            ))}
            <button type="button" onClick={addFaq} className="min-h-[40px] rounded-full border px-4 text-sm font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--tool-accent)' }}>
              + Add Question
            </button>
          </div>
        )}

        {type === 'BreadcrumbList' && (
          <div className="flex flex-col gap-3">
            {crumbItems.map((item, i) => (
              <div key={item.id} className="flex items-center gap-2 rounded-xl border p-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
                <span className="w-5 flex-shrink-0 font-mono text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                  {i + 1}
                </span>
                <input
                  className={`${fieldClass} min-h-[40px]`}
                  style={fieldStyle}
                  value={item.name}
                  onChange={(e) => setCrumbItems((prev) => prev.map((c) => (c.id === item.id ? { ...c, name: e.target.value } : c)))}
                  placeholder="Page name"
                  aria-label={`Breadcrumb ${i + 1} name`}
                />
                <input
                  className={`${fieldClass} min-h-[40px]`}
                  style={fieldStyle}
                  value={item.url}
                  onChange={(e) => setCrumbItems((prev) => prev.map((c) => (c.id === item.id ? { ...c, url: e.target.value } : c)))}
                  placeholder="URL"
                  aria-label={`Breadcrumb ${i + 1} URL`}
                />
                <div className="flex flex-shrink-0 items-center gap-1.5">
                  <button type="button" disabled={i === 0} onClick={() => moveCrumb(i, -1)} aria-label="Move up" className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--tool-accent)' }}>
                    ↑
                  </button>
                  <button type="button" disabled={i === crumbItems.length - 1} onClick={() => moveCrumb(i, 1)} aria-label="Move down" className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--tool-accent)' }}>
                    ↓
                  </button>
                  <button type="button" onClick={() => removeCrumb(item.id)} disabled={crumbItems.length <= 1} className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--color-error)' }}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addCrumb} className="min-h-[40px] rounded-full border px-4 text-sm font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--tool-accent)' }}>
              + Add Breadcrumb
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
          <button type="button" onClick={loadExample} className="inline-flex min-h-[40px] items-center justify-center rounded-full px-4 text-xs font-bold" style={{ border: '1.5px solid var(--border-strong)', color: 'var(--text-primary)' }}>
            Load Example
          </button>
          <ResetButton onClick={resetAll} />
        </div>
      </div>

      {/* Right: live JSON-LD output */}
      <div className="flex flex-col gap-3 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Generated JSON-LD
          </h2>
          <div className="flex gap-2">
            <CopyButton getText={() => scriptText} label="Copy Script Tag" />
            <DownloadButton getContent={() => JSON.stringify(jsonLd, null, 2)} filename={`${type.toLowerCase()}-schema.json`} mimeType="application/json" label="Download JSON" />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
          <pre className="max-h-[560px] overflow-auto p-4 text-xs leading-relaxed">
            <code style={{ color: '#e5e7eb', fontFamily: 'var(--font-mono)' }}>{scriptText}</code>
          </pre>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Paste this into your page&apos;s <code>&lt;head&gt;</code>. Values are escaped automatically for safe embedding.
        </p>
      </div>
    </div>
  );
}
