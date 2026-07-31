'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { buildQrPayload, validateQrInput, type QrContentType, type QrFields } from '@/lib/qr/utils';
import Field, { fieldClass, fieldStyle } from '@/components/tools/Field';
import Tabs from '@/components/tools/Tabs';
import CopyButton from '@/components/tools/CopyButton';
import ResetButton from '@/components/tools/ResetButton';
import ValidationMessage from '@/components/tools/ValidationMessage';

const TYPE_TABS = [
  { id: 'url', label: 'URL' },
  { id: 'text', label: 'Text' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'wifi', label: 'Wi-Fi' },
];

const EMPTY_FIELDS: QrFields = { url: '', text: '', email: '', emailSubject: '', phone: '', wifiSsid: '', wifiPassword: '', wifiSecurity: 'WPA', wifiHidden: false };

export default function QrCodeGenerator() {
  const [type, setType] = useState<QrContentType>('url');
  const [fields, setFields] = useState<QrFields>(EMPTY_FIELDS);
  const [size, setSize] = useState(280);
  const [margin, setMargin] = useState(2);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [dark, setDark] = useState('#17131f');
  const [light, setLight] = useState('#ffffff');
  const [genError, setGenError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function set<K extends keyof QrFields>(key: K, value: QrFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  const validationError = validateQrInput(type, fields);
  const payload = buildQrPayload(type, fields);

  useEffect(() => {
    if (!payload || validationError || !canvasRef.current) return;
    setGenError('');
    QRCode.toCanvas(canvasRef.current, payload, { width: size, margin, errorCorrectionLevel: errorLevel, color: { dark, light } }).catch(() => {
      setGenError('Could not generate a QR code for this content.');
    });
  }, [payload, validationError, size, margin, errorLevel, dark, light]);

  async function downloadPng() {
    if (!payload) return;
    try {
      const dataUrl = await QRCode.toDataURL(payload, { width: size, margin, errorCorrectionLevel: errorLevel, color: { dark, light } });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setGenError('Could not generate a PNG for this content.');
    }
  }

  async function downloadSvg() {
    if (!payload) return;
    try {
      const svg = await QRCode.toString(payload, { type: 'svg', margin, errorCorrectionLevel: errorLevel, color: { dark, light } });
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.svg';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setGenError('Could not generate an SVG for this content.');
    }
  }

  function reset() {
    setFields(EMPTY_FIELDS);
    setSize(280);
    setMargin(2);
    setErrorLevel('M');
    setDark('#17131f');
    setLight('#ffffff');
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <Tabs tabs={TYPE_TABS} activeId={type} onChange={(id) => setType(id as QrContentType)} ariaLabel="QR content type" />

        {type === 'url' && (
          <Field label="URL" htmlFor="qr-url" required>
            <input id="qr-url" value={fields.url} onChange={(e) => set('url', e.target.value)} placeholder="example.com" className={fieldClass} style={fieldStyle} />
          </Field>
        )}
        {type === 'text' && (
          <Field label="Text" htmlFor="qr-text" required>
            <textarea id="qr-text" rows={3} value={fields.text} onChange={(e) => set('text', e.target.value)} className={fieldClass} style={fieldStyle} />
          </Field>
        )}
        {type === 'email' && (
          <div className="flex flex-col gap-3">
            <Field label="Email address" htmlFor="qr-email" required>
              <input id="qr-email" value={fields.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" className={fieldClass} style={fieldStyle} />
            </Field>
            <Field label="Subject (optional)" htmlFor="qr-subject">
              <input id="qr-subject" value={fields.emailSubject} onChange={(e) => set('emailSubject', e.target.value)} className={fieldClass} style={fieldStyle} />
            </Field>
          </div>
        )}
        {type === 'phone' && (
          <Field label="Phone number" htmlFor="qr-phone" required>
            <input id="qr-phone" value={fields.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+1 555 010 0100" className={fieldClass} style={fieldStyle} />
          </Field>
        )}
        {type === 'wifi' && (
          <div className="flex flex-col gap-3">
            <Field label="Network name (SSID)" htmlFor="qr-ssid" required>
              <input id="qr-ssid" value={fields.wifiSsid} onChange={(e) => set('wifiSsid', e.target.value)} className={fieldClass} style={fieldStyle} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Security" htmlFor="qr-security">
                <select id="qr-security" value={fields.wifiSecurity} onChange={(e) => set('wifiSecurity', e.target.value as QrFields['wifiSecurity'])} className={fieldClass} style={fieldStyle}>
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </Field>
              {fields.wifiSecurity !== 'nopass' && (
                <Field label="Password" htmlFor="qr-password">
                  <input id="qr-password" value={fields.wifiPassword} onChange={(e) => set('wifiPassword', e.target.value)} className={fieldClass} style={fieldStyle} />
                </Field>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
              <input type="checkbox" checked={fields.wifiHidden} onChange={(e) => set('wifiHidden', e.target.checked)} style={{ accentColor: 'var(--tool-accent)' }} />
              Hidden network
            </label>
          </div>
        )}

        {validationError && <ValidationMessage>{validationError}</ValidationMessage>}

        <div className="grid grid-cols-2 gap-3 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
          <Field label="Size (px)" htmlFor="qr-size">
            <input id="qr-size" type="number" min={64} max={1024} value={size} onChange={(e) => setSize(Number(e.target.value))} className={fieldClass} style={fieldStyle} />
          </Field>
          <Field label="Margin" htmlFor="qr-margin">
            <input id="qr-margin" type="number" min={0} max={10} value={margin} onChange={(e) => setMargin(Number(e.target.value))} className={fieldClass} style={fieldStyle} />
          </Field>
          <Field label="Error correction" htmlFor="qr-ec">
            <select id="qr-ec" value={errorLevel} onChange={(e) => setErrorLevel(e.target.value as typeof errorLevel)} className={fieldClass} style={fieldStyle}>
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </Field>
          <div className="flex gap-2">
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="qr-dark" className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Foreground
              </label>
              <input id="qr-dark" type="color" value={dark} onChange={(e) => setDark(e.target.value)} className="h-11 w-full cursor-pointer rounded-lg border p-0.5" style={{ borderColor: 'var(--border-color)' }} />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <label htmlFor="qr-light" className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Background
              </label>
              <input id="qr-light" type="color" value={light} onChange={(e) => setLight(e.target.value)} className="h-11 w-full cursor-pointer rounded-lg border p-0.5" style={{ borderColor: 'var(--border-color)' }} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <CopyButton getText={() => payload} label="Copy Source Content" disabled={!payload} />
          <ResetButton onClick={reset} />
        </div>
      </div>

      {/* Live preview */}
      <div className="flex flex-col items-center gap-3 rounded-2xl border p-5" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
        {payload && !validationError ? (
          <canvas ref={canvasRef} className="rounded-lg" />
        ) : (
          <div className="flex h-56 w-56 items-center justify-center rounded-lg border border-dashed text-center text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
            Fill in the fields to preview a QR code.
          </div>
        )}
        {genError && <ValidationMessage>{genError}</ValidationMessage>}
        <div className="flex gap-2">
          <button type="button" onClick={downloadPng} disabled={!payload || !!validationError} className="inline-flex min-h-[40px] items-center justify-center rounded-full px-4 text-xs font-bold text-white disabled:opacity-40" style={{ background: 'var(--tool-accent)' }}>
            Download PNG
          </button>
          <button type="button" onClick={downloadSvg} disabled={!payload || !!validationError} className="inline-flex min-h-[40px] items-center justify-center rounded-full border px-4 text-xs font-bold disabled:opacity-40" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
            Download SVG
          </button>
        </div>
      </div>
    </div>
  );
}
