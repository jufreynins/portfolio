export interface DevicePreset {
  id: string;
  label: string;
  width: number;
  height: number;
}

export const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'desktop-1440', label: 'Desktop 1440×900', width: 1440, height: 900 },
  { id: 'laptop-1366', label: 'Laptop 1366×768', width: 1366, height: 768 },
  { id: 'laptop-1280', label: 'Laptop 1280×720', width: 1280, height: 720 },
  { id: 'tablet-1024', label: 'Tablet 1024×768', width: 1024, height: 768 },
  { id: 'tablet-768', label: 'Tablet 768×1024', width: 768, height: 1024 },
  { id: 'phone-430', label: 'Phone 430×932', width: 430, height: 932 },
  { id: 'phone-390', label: 'Phone 390×844', width: 390, height: 844 },
  { id: 'phone-375', label: 'Phone 375×812', width: 375, height: 812 },
  { id: 'phone-360', label: 'Phone 360×800', width: 360, height: 800 },
  { id: 'custom', label: 'Custom', width: 400, height: 800 },
];

export function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const candidate = /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(candidate);
    if (!/^https?:$/.test(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}
