export type QrContentType = 'url' | 'text' | 'email' | 'phone' | 'wifi';

export interface QrFields {
  url: string;
  text: string;
  email: string;
  emailSubject: string;
  phone: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiSecurity: 'WPA' | 'WEP' | 'nopass';
  wifiHidden: boolean;
}

function escapeWifi(value: string): string {
  return value.replace(/([\\;,"])/g, '\\$1');
}

export function buildQrPayload(type: QrContentType, fields: QrFields): string {
  switch (type) {
    case 'url': {
      const trimmed = fields.url.trim();
      if (!trimmed) return '';
      return /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    }
    case 'text':
      return fields.text;
    case 'email': {
      if (!fields.email.trim()) return '';
      const subject = fields.emailSubject.trim();
      return `mailto:${fields.email.trim()}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
    }
    case 'phone':
      return fields.phone.trim() ? `tel:${fields.phone.trim()}` : '';
    case 'wifi': {
      if (!fields.wifiSsid.trim()) return '';
      const security = fields.wifiSecurity === 'nopass' ? 'nopass' : fields.wifiSecurity;
      return `WIFI:T:${security};S:${escapeWifi(fields.wifiSsid)};${security !== 'nopass' ? `P:${escapeWifi(fields.wifiPassword)};` : ''}${fields.wifiHidden ? 'H:true;' : ''};`;
    }
    default:
      return '';
  }
}

/** Only flags genuinely malformed non-empty input — an empty field is a neutral "not filled in yet" state, not an error. */
export function validateQrInput(type: QrContentType, fields: QrFields): string | null {
  if (type === 'email' && fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) return 'Enter a valid email address.';
  return null;
}
