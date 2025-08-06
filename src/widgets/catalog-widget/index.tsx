import {
  CatalogItem,
  CatalogPagination,
  CatalogSection,
} from '@/shared/types/catalogTypes';
import { Tags } from '@/shared/ui';
import { TitleBlock } from '@/shared/ui/title-block';
import { FaqWidget, ProductListWidget, SectionWidget } from '@/widgets';

type CatalogWidgetProps = {
  items: CatalogItem[];
  pagi: CatalogPagination;
  section: CatalogSection;
  sections?: CatalogSection[];
  lowerTags?: CatalogSection[];
  upperTags?: CatalogSection[];
};

export const CatalogWidget: React.FC<CatalogWidgetProps> = ({
  items,
  section,
  sections,
  lowerTags,
  upperTags,
}) => {
  return (
    <main>
      <TitleBlock title={section.title} />
      <SectionWidget sections={sections} />
      <Tags tags={upperTags || []} />
      <ProductListWidget items={items} />
      <FaqWidget items={section.faq} />
      <Tags tags={lowerTags || []} />
    </main>
  );
};
