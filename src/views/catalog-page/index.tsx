import {
  CatalogItem,
  CatalogPagination,
  CatalogSection,
} from '@/shared/types/catalogTypes';
import { Breadcrumbs, Tags, TitleBlock } from '@/shared/ui';
import {
  FaqWidget,
  FilterWidget,
  ProductListWidget,
  SectionWidget,
} from '@/widgets';

type CatalogPageProps = {
  items: CatalogItem[];
  pagi: CatalogPagination;
  section: CatalogSection;
  sections?: CatalogSection[];
  lowerTags?: CatalogSection[];
  upperTags?: CatalogSection[];
};

export const CatalogPageView: React.FC<CatalogPageProps> = ({
  items,
  section,
  sections,
  lowerTags,
  upperTags,
}) => {
  return (
    <main>
      <Breadcrumbs path={section.__path} />
      <TitleBlock title={section.title} />
      <SectionWidget sections={sections} />
      <Tags tags={upperTags || []} />
      <FilterWidget sectionId={section.item_id} />
      <ProductListWidget items={items} />
      <FaqWidget items={section.faq} />
      <Tags tags={lowerTags || []} />
    </main>
  );
};
