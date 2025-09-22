import { cookies } from 'next/headers';

import { getFavorites } from '@/shared/api/favorites.api';

export default async function FavoritesPage() {
  const cookieStore = await cookies();
  const sid = cookieStore.get('session_id')?.value || '';

  const data = sid ? await getFavorites(sid) : null;

  console.log('data', data);

  if (!sid) {
    return (
      <div className="container">
        <h1>Избранное</h1>
        <p>Сессия не найдена. Обновите страницу.</p>
      </div>
    );
  }

  if (!data || typeof data === 'string') {
    return (
      <div className="container">
        <h1>Избранное</h1>
        <p>Не удалось получить данные.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Избранное</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
