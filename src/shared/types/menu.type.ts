export type MenuType = {
  sections: MenuSection[] | null;
};

export type MenuSection = {
  item_id: string;
  enable: string;
  title: string;
  url: string;
  sections: MenuSubSection[] | null;
};

export type MenuSubSection = {
  item_id: string;
  enable: string;
  title: string;
  url: string;
};
