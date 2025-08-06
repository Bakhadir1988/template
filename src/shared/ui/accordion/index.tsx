import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';

import { CatalogSectionFaq } from '@/shared/types/catalogTypes';

import styles from './accordion.module.css';

export const AccordionUi = ({ items }: { items: CatalogSectionFaq[] }) => {
  return (
    <Accordion className={styles.root} type="multiple">
      {Object.values(items).map((item) => (
        <AccordionItem
          key={item.item_id}
          className={styles.item}
          value={item.item_id}
        >
          <AccordionTrigger className={styles.trigger}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: item.answer }} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
