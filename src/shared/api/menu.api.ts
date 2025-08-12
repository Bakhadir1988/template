import { MenuSection, MenuType } from '../types';

export const getMenu = async (): Promise<MenuSection[] | null> => {
  const url = process.env.NEXT_PUBLIC_MENU;

  if (!url) {
    console.error('NEXT_PUBLIC_MENU не определен');
    return null;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const result: MenuType = await response.json();

    return result.sections;
  } catch (error) {
    console.error(
      'Ошибка при получении данных меню:',
      error instanceof Error ? error.message : 'Неизвестная ошибка',
    );
    return null;
  }
};
