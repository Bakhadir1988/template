import { CatalogType } from '../types/catalogTypes';

export async function getCatalog(slug: string): Promise<CatalogType | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return null;
  }

  const url = `${baseUrl}${slug}/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch catalog data:', error);
    throw error;
  }
}

export async function postCatalogFilters(
  form: FormData,
): Promise<CatalogType | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return null;
  }

  const url = baseUrl;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: form,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as CatalogType;
    }
    // Сервер вернул не JSON (например, HTML/текст). Безопасно вернём null.
    console.error('Unexpected response content-type:', contentType);
    return null;
  } catch (error) {
    console.error('Failed to post catalog filters:', error);
    throw error;
  }
}
