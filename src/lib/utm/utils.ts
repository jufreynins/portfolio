export interface UtmFields {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

export function validateUtm(fields: UtmFields): string | null {
  if (!fields.url.trim()) return 'Destination URL is required.';
  try {
    const candidate = /^[a-z]+:\/\//i.test(fields.url) ? fields.url : `https://${fields.url}`;
    new URL(candidate);
  } catch {
    return 'Enter a valid destination URL.';
  }
  if (!fields.source.trim()) return 'Campaign source is required.';
  if (!fields.medium.trim()) return 'Campaign medium is required.';
  if (!fields.campaign.trim()) return 'Campaign name is required.';
  return null;
}

export function buildUtmUrl(fields: UtmFields): string {
  const candidate = /^[a-z]+:\/\//i.test(fields.url) ? fields.url : `https://${fields.url}`;
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return '';
  }

  const params = url.searchParams;
  if (fields.source.trim()) params.set('utm_source', fields.source.trim());
  if (fields.medium.trim()) params.set('utm_medium', fields.medium.trim());
  if (fields.campaign.trim()) params.set('utm_campaign', fields.campaign.trim());
  if (fields.term.trim()) params.set('utm_term', fields.term.trim());
  if (fields.content.trim()) params.set('utm_content', fields.content.trim());

  return url.toString();
}

export const UTM_FIELD_EXPLANATIONS: Record<keyof Omit<UtmFields, 'url'>, string> = {
  source: 'Where the traffic comes from, e.g. "newsletter", "google", "facebook".',
  medium: 'The marketing channel, e.g. "email", "cpc", "social".',
  campaign: 'The specific campaign or promotion name, e.g. "spring-sale".',
  term: 'Paid search keyword, if applicable.',
  content: 'Distinguishes similar links in the same campaign, e.g. "header-button" vs "footer-link".',
};
