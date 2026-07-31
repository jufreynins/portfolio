export type RedirectType = '301' | '302';

export interface RedirectRow {
  id: string;
  source: string;
  destination: string;
  type: RedirectType;
}

export interface RowIssue {
  level: 'error' | 'warning';
  message: string;
}

export function normalizePath(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed.replace(/\/$/, '') || trimmed;
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (withSlash === '/') return '/';
  return withSlash.replace(/\/+$/, '');
}

/** Parses bulk-pasted text: one mapping per line, source and destination separated by `->`, `=>`, a comma, or whitespace. */
export function parseBulkText(text: string): { source: string; destination: string }[] {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const results: { source: string; destination: string }[] = [];
  for (const line of lines) {
    const match = line.split(/\s*(?:->|=>|,)\s*|\s+/).filter(Boolean);
    if (match.length >= 2) {
      results.push({ source: match[0], destination: match[1] });
    }
  }
  return results;
}

export function validateRows(rows: RedirectRow[]): Map<string, RowIssue[]> {
  const issues = new Map<string, RowIssue[]>();
  const bySource = new Map<string, string[]>();

  for (const row of rows) {
    const rowIssues: RowIssue[] = [];
    const source = normalizePath(row.source);
    const destination = normalizePath(row.destination);

    if (!source) rowIssues.push({ level: 'error', message: 'Source is required.' });
    if (!destination) rowIssues.push({ level: 'error', message: 'Destination is required.' });
    if (source && destination && source === destination) {
      rowIssues.push({ level: 'warning', message: 'Source and destination are identical — this redirect does nothing.' });
    }

    if (source) {
      const list = bySource.get(source) ?? [];
      list.push(row.id);
      bySource.set(source, list);
    }

    issues.set(row.id, rowIssues);
  }

  // Duplicate sources
  for (const [, ids] of bySource) {
    if (ids.length > 1) {
      for (const id of ids) {
        issues.get(id)?.push({ level: 'error', message: 'Duplicate source — another rule already redirects this same path.' });
      }
    }
  }

  // Chains and loops: does this row's destination match another row's source?
  const sourceToDestination = new Map<string, string>();
  for (const row of rows) {
    const s = normalizePath(row.source);
    const d = normalizePath(row.destination);
    if (s && d) sourceToDestination.set(s, d);
  }

  for (const row of rows) {
    const destination = normalizePath(row.destination);
    const source = normalizePath(row.source);
    if (!destination || !sourceToDestination.has(destination)) continue;

    // Follow the chain to see if it loops back to the original source.
    const visited = new Set<string>([source]);
    let cursor = destination;
    let isLoop = false;
    let steps = 0;
    while (sourceToDestination.has(cursor) && steps < rows.length + 1) {
      if (visited.has(cursor)) {
        isLoop = cursor === source;
        break;
      }
      visited.add(cursor);
      cursor = sourceToDestination.get(cursor)!;
      steps += 1;
    }

    if (isLoop) {
      issues.get(row.id)?.push({ level: 'error', message: 'This creates a redirect loop within the rules provided.' });
    } else {
      issues.get(row.id)?.push({ level: 'warning', message: 'This creates a redirect chain — the destination is itself redirected elsewhere.' });
    }
  }

  return issues;
}

export function toApache(rows: RedirectRow[]): string {
  const lines = ['# Generated redirect rules — review before deploying to production.'];
  for (const r of rows) {
    if (!r.source || !r.destination) continue;
    lines.push(`Redirect ${r.type} ${normalizePath(r.source)} ${normalizePath(r.destination)}`);
  }
  return lines.join('\n') + '\n';
}

export function toNginx(rows: RedirectRow[]): string {
  const lines = ['# Generated redirect rules — review before deploying to production.'];
  for (const r of rows) {
    if (!r.source || !r.destination) continue;
    const code = r.type === '301' ? 'permanent' : 'redirect';
    lines.push(`rewrite ^${normalizePath(r.source)}$ ${normalizePath(r.destination)} ${code};`);
  }
  return lines.join('\n') + '\n';
}

export function toNetlify(rows: RedirectRow[]): string {
  const lines = ['# Generated redirect rules — review before deploying to production.'];
  for (const r of rows) {
    if (!r.source || !r.destination) continue;
    lines.push(`${normalizePath(r.source)}  ${normalizePath(r.destination)}  ${r.type}!`);
  }
  return lines.join('\n') + '\n';
}

export function toCsv(rows: RedirectRow[], domainBase: string): string {
  const lines = ['source,destination,type'];
  for (const r of rows) {
    if (!r.source || !r.destination) continue;
    const source = domainBase ? `${domainBase.replace(/\/$/, '')}${normalizePath(r.source)}` : normalizePath(r.source);
    const destination = /^https?:\/\//i.test(r.destination) ? normalizePath(r.destination) : domainBase ? `${domainBase.replace(/\/$/, '')}${normalizePath(r.destination)}` : normalizePath(r.destination);
    lines.push(`"${source}","${destination}",${r.type}`);
  }
  return lines.join('\n') + '\n';
}

export function toSimpleMapping(rows: RedirectRow[]): string {
  return rows
    .filter((r) => r.source && r.destination)
    .map((r) => `${normalizePath(r.source)} → ${normalizePath(r.destination)} (${r.type})`)
    .join('\n');
}
