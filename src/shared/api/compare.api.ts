import { appendSessionToForm } from '@/shared/lib/utils/session-id';

export type CompareResponse = {
  items: unknown[];
  total_cost?: number;
  total_quantity?: number;
};

type AddToCompareItem = { item_id: string };

export async function addToCompare(
  item: AddToCompareItem,
): Promise<CompareResponse | string> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_API_URL не определен');
    return '';
  }

  const form = new FormData();
  appendSessionToForm(form);
  form.append('comp', 'list_server');
  form.append('list', 'compare');
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
      return (await response.json()) as CompareResponse;
    }
    return await response.text();
  } catch (error) {
    console.error('Compare:', error);
    throw error;
  }
}
