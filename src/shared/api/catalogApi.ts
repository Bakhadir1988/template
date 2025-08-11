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
      body: form,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return (await response.json()) as CatalogType;
  } catch (error) {
    console.error('Failed to post catalog filters:', error);
    throw error;
  }
}
