'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import React, { useEffect, useRef, useState } from 'react';

import styles from './tabs-ui.module.scss';

export const TabsUi = ({
  tabs,
}: {
  tabs: { value: string; label: string; content: React.ReactNode }[];
}) => {
  const [value, setValue] = useState<string>(tabs[0]?.value ?? '');
  // массив значений табов можно вычислять на лету при необходимости
  const listRef = useRef<HTMLDivElement | null>(null);
  // const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  // const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  // // helper можно добавить при необходимости для клавиатурной навигации

  // // Свайп используется только для нативной прокрутки списка табов, без смены активного таба

  // const updateArrows = (): void => {
  //   const el = listRef.current;
  //   if (!el) return;
  //   const { scrollLeft, scrollWidth, clientWidth } = el;
  //   setCanScrollLeft(scrollLeft > 0);
  //   setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  // };

  // const scrollByAmount = (amount: number): void => {
  //   const el = listRef.current;
  //   if (!el) return;
  //   el.scrollBy({ left: amount, behavior: 'smooth' });
  // };

  // Прокручиваем активный таб в зону видимости при переключении
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLButtonElement>('[data-state="active"]');
    if (active) {
      active.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
    // updateArrows();
  }, [value]);

  // useEffect(() => {
  //   updateArrows();
  //   const el = listRef.current;
  //   if (!el) return;
  //   const onScroll = () => updateArrows();
  //   el.addEventListener('scroll', onScroll, { passive: true });
  //   return () => el.removeEventListener('scroll', onScroll);
  // }, []);

  return (
    <section className={styles.root}>
      <div className={'container'}>
        <Tabs value={value} onValueChange={setValue} className={styles.tabs}>
          <div className={styles.listWrapper}>
            <TabsList
              className={styles.list}
              ref={listRef as unknown as React.RefObject<HTMLDivElement>}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={styles.trigger}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className={styles.content}
            >
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
