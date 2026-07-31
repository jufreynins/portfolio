'use client';

import { useRef, useState } from 'react';
import { dohQuery, findDmarc, normalizeDomain, stripQuotes, DnsQueryError, type DnsRecordType } from '@/lib/dns/utils';
import CopyButton from '@/components/tools/CopyButton';
import ValidationMessage from '@/components/tools/ValidationMessage';
import Field, { fieldClass, fieldStyle } from '@/components/tools/Field';

type RowStatus = 'Found' | 'Missing' | 'Needs Review' | 'Query Failed' | 'Not Applicable';

interface RowResult {
  key: string;
  type: string;
  host: string;
  status: RowStatus;
  values: { data: string; ttl?: number }[];
  explanation: string;
  nextAction?: string;
}

interface SectionResult {
  title: string;
  rows: RowResult[];
}

const ALL_TYPES: { id: DnsRecordType | 'SPF' | 'DMARC' | 'DKIM'; label: string }[] = [
  { id: 'A', label: 'A' },
  { id: 'AAAA', label: 'AAAA' },
  { id: 'CNAME', label: 'CNAME' },
  { id: 'MX', label: 'MX' },
  { id: 'TXT', label: 'TXT' },
  { id: 'NS', label: 'NS' },
  { id: 'SPF', label: 'SPF' },
  { id: 'DMARC', label: 'DMARC' },
  { id: 'DKIM', label: 'DKIM' },
];

const STATUS_STYLE: Record<RowStatus, { color: string; bg: string; border: string; icon: string }> = {
  Found: { color: 'var(--color-success)', bg: 'var(--color-success-soft)', border: 'color-mix(in srgb, var(--color-success) 35%, white)', icon: '✓' },
  Missing: { color: 'var(--color-warning)', bg: 'var(--color-warning-soft)', border: 'color-mix(in srgb, var(--color-warning) 35%, white)', icon: '!' },
  'Needs Review': { color: 'var(--color-warning)', bg: 'var(--color-warning-soft)', border: 'color-mix(in srgb, var(--color-warning) 35%, white)', icon: '?' },
  'Query Failed': { color: 'var(--color-error)', bg: 'var(--color-error-soft)', border: 'color-mix(in srgb, var(--color-error) 35%, white)', icon: '✕' },
  'Not Applicable': { color: 'var(--text-secondary)', bg: 'var(--surface-warm)', border: 'var(--border-color)', icon: '–' },
};

async function safeQuery(name: string, type: DnsRecordType): Promise<{ ok: true; data: string[] } | { ok: false; error: string }> {
  try {
    const answers = await dohQuery(name, type);
    return { ok: true, data: answers.map((a) => a.data) };
  } catch (err) {
    return { ok: false, error: err instanceof DnsQueryError ? err.message : 'The lookup failed unexpectedly.' };
  }
}

export default function DnsEmailChecker() {
  const [domainInput, setDomainInput] = useState('');
  const [selector, setSelector] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(ALL_TYPES.map((t) => t.id)));
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sections, setSections] = useState<SectionResult[] | null>(null);
  const [checkedHost, setCheckedHost] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [cooldown, setCooldown] = useState(false);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function toggleType(id: string) {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleExpanded(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function runCheck(e?: React.FormEvent) {
    e?.preventDefault();
    if (cooldown) return;

    const normalized = normalizeDomain(domainInput);
    if ('error' in normalized) {
      setStatus('error');
      setErrorMessage(normalized.error);
      setSections(null);
      return;
    }

    const { hostname } = normalized;
    setStatus('loading');
    setErrorMessage('');
    setCooldown(true);
    if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    cooldownTimer.current = setTimeout(() => setCooldown(false), 4000);

    const want = (id: string) => selectedTypes.has(id);

    const [a, aaaa, cname, mx, ns, txt, dmarcTxt, dkimTxt] = await Promise.all([
      want('A') ? safeQuery(hostname, 'A') : Promise.resolve(null),
      want('AAAA') ? safeQuery(hostname, 'AAAA') : Promise.resolve(null),
      want('CNAME') ? safeQuery(hostname, 'CNAME') : Promise.resolve(null),
      want('MX') ? safeQuery(hostname, 'MX') : Promise.resolve(null),
      want('NS') ? safeQuery(hostname, 'NS') : Promise.resolve(null),
      want('TXT') || want('SPF') ? safeQuery(hostname, 'TXT') : Promise.resolve(null),
      want('DMARC') ? safeQuery(`_dmarc.${hostname}`, 'TXT') : Promise.resolve(null),
      want('DKIM') && selector.trim() ? safeQuery(`${selector.trim()}._domainkey.${hostname}`, 'TXT') : Promise.resolve(null),
    ]);

    function row(key: string, type: string, host: string, result: typeof a, opts?: { emptyExplains?: string; foundExplains?: string; nextAction?: string; notApplicable?: string }): RowResult {
      if (opts?.notApplicable) {
        return { key, type, host, status: 'Not Applicable', values: [], explanation: opts.notApplicable };
      }
      if (!result) return { key, type, host, status: 'Not Applicable', values: [], explanation: 'Not included in this check.' };
      if (!result.ok) return { key, type, host, status: 'Query Failed', values: [], explanation: result.error };
      if (result.data.length === 0) {
        return { key, type, host, status: 'Missing', values: [], explanation: opts?.emptyExplains ?? 'No record found.', nextAction: opts?.nextAction };
      }
      return {
        key,
        type,
        host,
        status: result.data.length > 1 && type === 'SPF' ? 'Needs Review' : 'Found',
        values: result.data.map((data) => ({ data })),
        explanation: opts?.foundExplains ?? 'Record found.',
      };
    }

    const websiteRows: RowResult[] = [
      row('A', 'A', hostname, a, { emptyExplains: 'No IPv4 address for this host.', foundExplains: 'Points this host to an IPv4 address.', nextAction: 'Add an A record with your hosting provider.' }),
      row('AAAA', 'AAAA', hostname, aaaa, { emptyExplains: 'No IPv6 record — optional, most sites work fine on IPv4 only.', foundExplains: 'Points this host to an IPv6 address.' }),
      row('CNAME', 'CNAME', hostname, cname, { emptyExplains: 'No CNAME on this host — common for a root domain, which typically uses A/AAAA instead.', foundExplains: 'Aliases this host to another hostname.' }),
      row('NS', 'NS', hostname, ns, { emptyExplains: 'Could not determine nameservers for this host.', foundExplains: 'Nameservers currently answering for this domain.' }),
    ];

    const mailRows: RowResult[] = [
      row('MX', 'MX', hostname, mx, {
        emptyExplains: 'No mail server configured — email sent to this domain may not be delivered.',
        foundExplains: 'Mail servers responsible for delivering email to this domain.',
        nextAction: 'Add MX records with your email provider (Google Workspace, Microsoft 365, etc.).',
      }),
    ];

    let spfResult: RowResult;
    if (!want('SPF')) {
      spfResult = { key: 'SPF', type: 'SPF', host: hostname, status: 'Not Applicable', values: [], explanation: 'Not included in this check.' };
    } else if (!txt) {
      spfResult = { key: 'SPF', type: 'SPF', host: hostname, status: 'Not Applicable', values: [], explanation: 'Not included in this check.' };
    } else if (!txt.ok) {
      spfResult = { key: 'SPF', type: 'SPF', host: hostname, status: 'Query Failed', values: [], explanation: txt.error };
    } else {
      const spfRecords = txt.data.filter((t) => stripQuotes(t).toLowerCase().startsWith('v=spf1'));
      if (spfRecords.length === 0) {
        spfResult = {
          key: 'SPF',
          type: 'SPF',
          host: hostname,
          status: 'Missing',
          values: [],
          explanation: 'No SPF record — receiving mail servers can’t verify authorized senders for this domain.',
          nextAction: 'Add a TXT record starting with v=spf1.',
        };
      } else if (spfRecords.length > 1) {
        spfResult = { key: 'SPF', type: 'SPF', host: hostname, status: 'Needs Review', values: spfRecords.map((data) => ({ data })), explanation: 'Multiple SPF records found — only one is allowed per domain and this can break mail delivery.' };
      } else {
        spfResult = { key: 'SPF', type: 'SPF', host: hostname, status: 'Found', values: [{ data: spfRecords[0] }], explanation: 'Lists which mail servers are authorized to send email for this domain.' };
      }
    }

    const dmarcRow = row('DMARC', 'DMARC', `_dmarc.${hostname}`, dmarcTxt, {
      emptyExplains: 'No DMARC record — add one for reporting and stronger protection against spoofing.',
      foundExplains: 'Tells receiving servers what to do with mail that fails SPF/DKIM checks.',
      nextAction: `Add a TXT record at _dmarc.${hostname} starting with v=DMARC1.`,
    });
    const dmarcResult: RowResult =
      dmarcRow.status === 'Found' && !findDmarc(dmarcRow.values.map((v) => v.data))
        ? { ...dmarcRow, status: 'Missing', explanation: 'A TXT record exists at this host, but none start with v=DMARC1.' }
        : dmarcRow;

    let dkimResult: RowResult;
    if (!want('DKIM')) {
      dkimResult = { key: 'DKIM', type: 'DKIM', host: hostname, status: 'Not Applicable', values: [], explanation: 'Not included in this check.' };
    } else if (!selector.trim()) {
      dkimResult = { key: 'DKIM', type: 'DKIM', host: hostname, status: 'Not Applicable', values: [], explanation: 'Provide your email provider’s DKIM selector (e.g. “google” or “selector1”) to check this record.' };
    } else {
      dkimResult = row(`${selector.trim()}._domainkey`, 'DKIM', `${selector.trim()}._domainkey.${hostname}`, dkimTxt, {
        emptyExplains: `No DKIM record found at this selector — verify the selector name with your email provider.`,
        foundExplains: 'Lets receiving servers cryptographically verify mail sent from this domain.',
        nextAction: 'Confirm the selector value from your email provider’s setup instructions.',
      });
    }

    const emailRows: RowResult[] = [spfResult, dmarcResult, dkimResult];

    const filterUnselected = (rows: RowResult[]) => rows.filter((r) => selectedTypes.has(r.type) || r.status !== 'Not Applicable' || r.type === 'DKIM');

    setSections([
      { title: 'Website DNS', rows: filterUnselected(websiteRows) },
      { title: 'Mail Routing', rows: filterUnselected(mailRows) },
      { title: 'Email Authentication', rows: filterUnselected(emailRows) },
    ]);
    setCheckedHost(hostname);
    setStatus('success');
  }

  function reset() {
    setDomainInput('');
    setSelector('');
    setSections(null);
    setStatus('idle');
    setErrorMessage('');
    setCheckedHost('');
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={runCheck} className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Domain" htmlFor="dns-domain" required hint="example.com, www.example.com, or a full URL — we'll extract the hostname.">
            <input
              id="dns-domain"
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="example.com"
              className={fieldClass}
              style={fieldStyle}
              aria-describedby={errorMessage ? 'dns-domain-error' : undefined}
              aria-invalid={!!errorMessage}
            />
          </Field>
          <Field label="DKIM Selector" htmlFor="dns-selector" hint="Optional — needed only to check a DKIM record.">
            <input
              id="dns-selector"
              type="text"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              placeholder="google, selector1, s1…"
              className={fieldClass}
              style={fieldStyle}
            />
          </Field>
        </div>

        {errorMessage && <ValidationMessage id="dns-domain-error">{errorMessage}</ValidationMessage>}

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Record types to check
          </span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Record type filter">
            {ALL_TYPES.map((t) => {
              const active = selectedTypes.has(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleType(t.id)}
                  aria-pressed={active}
                  className="min-h-[32px] rounded-full px-3 font-mono text-xs font-bold transition-colors"
                  style={active ? { background: 'var(--tool-accent)', color: '#fff' } : { border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={status === 'loading' || cooldown}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 text-sm font-bold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: 'var(--tool-accent)' }}
          >
            {status === 'loading' ? 'Checking…' : 'Check Records'}
          </button>
          {sections && (
            <button type="button" onClick={reset} className="inline-flex min-h-[44px] items-center justify-center rounded-full px-4 text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
              Clear
            </button>
          )}
          <p className="text-xs" style={{ color: 'var(--text-muted)' }} aria-live="polite">
            {cooldown && status !== 'loading' ? 'Wait a moment before checking again.' : ''}
          </p>
        </div>
      </form>

      {status === 'idle' && !sections && (
        <div className="rounded-2xl border border-dashed p-8 text-center" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Enter a domain above to inspect its DNS, mail routing, and email authentication records.
          </p>
        </div>
      )}

      {sections && (
        <div className="flex flex-col gap-6" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
            <span className="font-mono text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {checkedHost}
            </span>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STATUS_STYLE) as RowStatus[]).map((s) => (
                <span key={s} className="inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: STATUS_STYLE[s].color }}>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full text-[9px]" style={{ background: STATUS_STYLE[s].bg, border: `1px solid ${STATUS_STYLE[s].border}` }}>
                    {STATUS_STYLE[s].icon}
                  </span>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2.5">
              <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--tool-accent)' }}>
                {section.title}
              </h3>
              <div className="flex flex-col gap-2">
                {section.rows.map((r) => {
                  const s = STATUS_STYLE[r.status];
                  const isExpanded = expanded.has(r.key);
                  return (
                    <div key={r.key} className="rounded-xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
                      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }} aria-hidden="true">
                            {s.icon}
                          </span>
                          <div className="flex min-w-0 flex-col">
                            <span className="font-mono text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                              {r.type}
                            </span>
                            <span className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                              {r.host}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide" style={{ background: s.bg, color: s.color }}>
                            {r.status}
                          </span>
                          {r.values.length > 0 && (
                            <button type="button" onClick={() => toggleExpanded(r.key)} aria-expanded={isExpanded} className="text-xs font-bold underline-offset-2 hover:underline" style={{ color: 'var(--tool-accent)' }}>
                              {isExpanded ? 'Hide' : 'Details'}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="px-3.5 pb-3">
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {r.explanation}
                        </p>
                        {r.nextAction && (r.status === 'Missing' || r.status === 'Needs Review') && (
                          <p className="mt-1 text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                            Suggested: {r.nextAction}
                          </p>
                        )}
                      </div>
                      {isExpanded && r.values.length > 0 && (
                        <div className="flex flex-col gap-1.5 border-t px-3.5 py-3" style={{ borderColor: 'var(--border-color)' }}>
                          {r.values.map((v, i) => (
                            <div key={i} className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2" style={{ background: 'var(--surface-warm)' }}>
                              <code className="min-w-0 flex-1 truncate font-mono text-xs" style={{ color: 'var(--text-primary)' }} title={v.data}>
                                {v.data}
                              </code>
                              <CopyButton getText={() => v.data} label="Copy" copiedLabel="Copied" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
            A recently changed record may still be propagating. Re-run the check after a few minutes if something looks out of date.
          </p>
        </div>
      )}
    </div>
  );
}
