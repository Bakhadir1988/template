import { CatalogType } from '../types/catalogTypes';

export async function getCatalog(slug: string): Promise<CatalogType | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return null;
  }

  console.log('slug111', slug);

  const url = `${baseUrl}${slug}/`;
  console.log('API URL:', url);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 1000,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch catalog data:', error);
    throw error;
  }
}
