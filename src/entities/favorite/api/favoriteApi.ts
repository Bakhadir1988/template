const BASE_URL = "https://dev.nmcms.ru/api/";

export interface ListServerResponse {
  status: "OK";
  items?: Array<{
    item_id: string;
    title: string;
    announce: {
      image: string;
    };
    text: string;
    url: string;
  }>;
  total_cost: number;
  total_quantity: number;
}

export const favoriteApi = {
  add: async (itemId: string): Promise<ListServerResponse> => {
    const formData = new FormData();
    formData.append("comp", "list_server");
    formData.append("list", "fav");
    formData.append("action", "add");
    formData.append("item_id", itemId);
    formData.append("subitem_id", "");
    formData.append("quantity", "1");

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка сети ${response.status}`);
    }

    return response.json();
  },

  remove: async (itemId: string): Promise<ListServerResponse> => {
    const formData = new FormData();
    formData.append("comp", "list_server");
    formData.append("list", "fav");
    formData.append("action", "del");
    formData.append("item_id", itemId);

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка сети ${response.status}`);
    }

    return response.json();
  },

  get: async (): Promise<ListServerResponse> => {
    const formData = new FormData();
    formData.append("comp", "list_server");
    formData.append("list", "fav");

    const response = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка сети ${response.status}`);
    }

    return response.json();
  },
};
