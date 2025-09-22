'use client';

import { useEffect } from 'react';

export const SessionInit = () => {
  useEffect(() => {
    try {
      const NAME = 'session_id';
      const cookie = document.cookie
        .split('; ')
        .find((r) => r.startsWith(NAME + '='));
      if (!cookie) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const sid = (
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
              })
        ).replace(/-/g, '');
        document.cookie = `${NAME}=${encodeURIComponent(sid)}; Path=/; SameSite=Lax`;
      }
    } catch {}
  }, []);
  return null;
};
