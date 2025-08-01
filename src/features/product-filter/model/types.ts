export type FilterResponse = {
  props: FilterType[];
  section: Record<string, unknown>;
  summary: Record<string, unknown>;
};

export type FilterValues = Record<string, unknown>;

export type FilterType = {
  type_id: string;
  type_name: string;
  groups: Record<string, FilterGroup>;
};

export type FilterGroup = {
  group_id: string;
  tpl_key: string;
  variant: string;
  props: Record<string, FilterProp>;
};

export type FilterProp = {
  prop_id: string;
  title: string;
  type: string;
  tpl_key: string;
  unit: string;
  filter_enabled: string;
  valuefield: string;
  variants?: string[];
  value?: null | string;
  filter?: Record<string, FilterVariant>;
  show?: boolean;
};

export type FilterVariant = {
  label: string;
  total_count: string;
  enabled: null | boolean;
  current_count: string;
};
