export interface ParsedUrlInfo {
  protocol: string;
  username: string;
  hasPassword: boolean;
  hostname: string;
  port: string;
  pathname: string;
  hash: string;
  origin: string;
}

export function parseUrl(input: string): { url: URL; info: ParsedUrlInfo } | { error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { error: 'Enter a URL to parse.' };
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    return {
      url,
      info: {
        protocol: url.protocol,
        username: url.username,
        hasPassword: !!url.password,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? '443 (default)' : url.protocol === 'http:' ? '80 (default)' : ''),
        pathname: url.pathname,
        hash: url.hash,
        origin: url.origin,
      },
    };
  } catch {
    return { error: 'That doesn’t look like a valid URL.' };
  }
}

export interface QueryParamRow {
  id: string;
  key: string;
  value: string;
}

export function paramsFromUrl(url: URL): QueryParamRow[] {
  const rows: QueryParamRow[] = [];
  let i = 0;
  url.searchParams.forEach((value, key) => {
    rows.push({ id: `p-${i}`, key, value });
    i += 1;
  });
  return rows;
}

export function rebuildUrl(base: URL, params: QueryParamRow[], hash: string): string {
  const url = new URL(base.origin + base.pathname);
  for (const p of params) {
    if (p.key) url.searchParams.append(p.key, p.value);
  }
  url.hash = hash;
  return url.toString();
}
