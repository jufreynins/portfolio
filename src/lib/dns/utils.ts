export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS';

const TYPE_CODE: Record<DnsRecordType, number> = { A: 1, NS: 2, CNAME: 5, MX: 15, TXT: 16, AAAA: 28 };
const CODE_TYPE: Record<number, string> = { 1: 'A', 2: 'NS', 5: 'CNAME', 15: 'MX', 16: 'TXT', 28: 'AAAA' };

export interface DohAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export interface DohResponse {
  Status: number;
  Answer?: DohAnswer[];
}

const DOH_ENDPOINT = 'https://cloudflare-dns.com/dns-query';
const REQUEST_TIMEOUT_MS = 8000;
const MAX_RESPONSE_BYTES = 200_000;

/**
 * Accepts "example.com", "www.example.com", or "https://example.com/path" and returns
 * just the valid hostname. Rejects IP literals and localhost/internal-looking names to
 * avoid the tool being used to probe non-public hosts.
 */
export function normalizeDomain(input: string): { hostname: string } | { error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { error: 'Enter a domain to check.' };

  let candidate = trimmed;
  if (!/^[a-z]+:\/\//i.test(candidate)) candidate = `https://${candidate}`;

  let hostname: string;
  try {
    hostname = new URL(candidate).hostname.toLowerCase();
  } catch {
    return { error: 'That doesn’t look like a valid domain.' };
  }

  if (!hostname) return { error: 'That doesn’t look like a valid domain.' };

  const isIpLiteral = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || hostname.includes(':');
  if (isIpLiteral) return { error: 'Enter a domain name, not an IP address.' };

  const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
  if (blockedHosts.includes(hostname) || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    return { error: 'Internal or local hostnames can’t be checked from here.' };
  }

  if (!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/.test(hostname)) {
    return { error: 'That doesn’t look like a valid domain.' };
  }

  return { hostname };
}

export class DnsQueryError extends Error {}

export async function dohQuery(name: string, type: DnsRecordType): Promise<DohAnswer[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const url = `${DOH_ENDPOINT}?name=${encodeURIComponent(name)}&type=${TYPE_CODE[type]}`;
    const response = await fetch(url, {
      headers: { accept: 'application/dns-json' },
      signal: controller.signal,
    });

    if (!response.ok) throw new DnsQueryError(`DNS query failed (${response.status}).`);

    const text = await response.text();
    if (text.length > MAX_RESPONSE_BYTES) throw new DnsQueryError('DNS response was unexpectedly large.');

    const parsed = JSON.parse(text) as DohResponse;
    if (parsed.Status === 3) return []; // NXDOMAIN — treat as "no records", callers decide Missing vs domain-not-found
    if (parsed.Status !== 0) throw new DnsQueryError(`DNS resolver returned status ${parsed.Status}.`);

    return (parsed.Answer ?? []).filter((a) => CODE_TYPE[a.type] === type);
  } catch (err) {
    if (err instanceof DnsQueryError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') throw new DnsQueryError('The DNS query timed out.');
    throw new DnsQueryError('Could not reach the public DNS resolver.');
  } finally {
    clearTimeout(timeout);
  }
}

export function stripQuotes(txt: string): string {
  return txt.replace(/^"|"$/g, '');
}

export function findSpf(txtRecords: string[]): string | null {
  return txtRecords.find((t) => stripQuotes(t).toLowerCase().startsWith('v=spf1')) ?? null;
}

export function findDmarc(txtRecords: string[]): string | null {
  return txtRecords.find((t) => stripQuotes(t).toLowerCase().startsWith('v=dmarc1')) ?? null;
}
