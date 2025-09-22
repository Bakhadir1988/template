const COOKIE_NAME = 'session_id';

function createUuid(): string {
  // Prefer crypto.randomUUID when available
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID().replace(/-/g, '');
  }
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function writeSessionCookie(value: string) {
  if (typeof document === 'undefined') return;
  // Session cookie (no Max-Age/Expires) — живёт до закрытия браузера
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; SameSite=Lax`;
}

export function getOrCreateSessionIdCookie(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = readCookie(COOKIE_NAME);
    if (existing && existing.length > 0) return existing;
    const sid = createUuid();
    writeSessionCookie(sid);
    return sid;
  } catch {
    return createUuid();
  }
}

export function appendSessionToForm(form: FormData) {
  const sid = getOrCreateSessionIdCookie();
  if (sid) form.append('session_id', sid);
}
