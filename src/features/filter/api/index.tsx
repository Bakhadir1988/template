import { FilterResponse } from '../model/types';

export const getFilter = async (
  sectionId: string,
): Promise<FilterResponse | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FILTER_ID}${sectionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch filter');
  }

  const data = await response.json();

  return data;
};
