import Image from 'next/image';

import { ProductType } from '@/shared/types/productTypes';
import { Breadcrumbs, TabsUi } from '@/shared/ui';

import styles from './product-detail-page-view.module.scss';

export const ProductDetailPageView = ({ data }: { data: ProductType }) => {
  const breadcrumbs = [
    ...data.__path,
    { title: data.title, url: '', item_id: data.item_id },
  ];

  const characteristics = Object.entries(data.chars).map(([key, value]) => {
    return {
      label: key,
      value,
    };
  });

  return (
    <main className={styles.root}>
      <Breadcrumbs path={breadcrumbs} />
      <section className={styles.product}>
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data.imgs[0]}`}
            alt={data.title}
            priority
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className={styles.info}>
          <h1>{data.title}</h1>
          <div className={styles.price}>{data.price} ₽</div>
        </div>
      </section>

      <TabsUi
        tabs={[
          // Показываем таб "Описание" только если есть контент
          ...(data.content
            ? [
                {
                  value: 'description',
                  label: 'Описание',
                  content: (
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                  ),
                },
              ]
            : []),
          {
            value: 'characteristics',
            label: 'Характеристики',
            content: <div>11</div>,
          },
          { value: 'reviews', label: 'Отзывы', content: <div>Отзывы</div> },
          {
            value: 'delivery',
            label: 'Доставка',
            content: <div>Доставка</div>,
          },
          { value: 'payment', label: 'Оплата', content: <div>Оплата</div> },
        ]}
      />
    </main>
  );
};
