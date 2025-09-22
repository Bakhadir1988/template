export type FavoritesResponse = {
  items: unknown[];
  total_cost?: number;
  total_quantity?: number;
};

type AddToFavoritesItem = { item_id: string };

// Read session id from cookie (preferred) or create one and set session cookie
function getSessionId(): string {
  if (typeof document === 'undefined') return '';
  const NAME = 'session_id';
  const cookie = document.cookie
    .split('; ')
    .find((r) => r.startsWith(NAME + '='));
  if (cookie) return decodeURIComponent(cookie.split('=')[1]);
  // generate
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sid =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
  document.cookie = `${NAME}=${encodeURIComponent(sid)}; Path=/; SameSite=Lax`;
  return sid;
}

export async function addToFavorites(
  item: AddToFavoritesItem,
): Promise<FavoritesResponse | string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return '';
  }

  const form = new FormData();
  const sessionId = getSessionId();
  if (sessionId) {
    form.append('session_id', sessionId);
  }
  form.append('comp', 'list_server');
  form.append('list', 'fav');
  form.append('action', 'add');
  form.append('item_id', item.item_id);
  form.append('subitem_id', '');
  form.append('quantity', '1');

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      credentials: 'include',
      body: form,
    });
    if (!response.ok) {
      throw new Error('Error');
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as FavoritesResponse;
    }
    return await response.text();
  } catch (error) {
    console.error('Favorites:', error);
    throw error;
  }
}

export async function removeFromFavorites(
  item: AddToFavoritesItem,
): Promise<FavoritesResponse | string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return '';
  }

  const form = new FormData();
  const sessionId = getSessionId();
  if (sessionId) {
    form.append('session_id', sessionId);
  }
  form.append('comp', 'list_server');
  form.append('list', 'fav');
  form.append('action', 'del');
  form.append('item_id', item.item_id);
  form.append('subitem_id', '');
  form.append('quantity', '1');

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      credentials: 'include',
      body: form,
    });
    if (!response.ok) {
      throw new Error('Error');
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as FavoritesResponse;
    }
    return await response.text();
  } catch (error) {
    console.error('Favorites remove:', error);
    throw error;
  }
}

export async function getFavorites(
  sessionId: string,
): Promise<FavoritesResponse | string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return '';
  }

  const form = new FormData();
  form.append('comp', 'list_server');
  form.append('list', 'fav');
  form.append('session_id', sessionId);

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: form,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Error');
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as FavoritesResponse;
    }
    return await response.text();
  } catch (error) {
    console.error('Favorites get:', error);
    throw error;
  }
}
