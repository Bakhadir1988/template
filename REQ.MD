Задача для фильтра и товаров

1 нужно создать запрос POST через FormData
2 Пример запроса

comp "filter"
template "filter"
filter[8ef03633][gt] "1832"
filter[8ef03633][lt] "46972"
sect_id "ae916ee4"

3 Обязательно использовать префикс filter и id свойства - filter[id]
4 Для цен обязательно нужно добавлять [gt] и [lt] где [gt] - это минимальное значение, а [gt] это максимальное значение filter[id][gt], filter[id][lt]

5 После применения фильтра нужно обновлять товары

---

План работ (предварительный, без реализации)

1. Маппинг выбранных значений -> FormData
   - Пройтись по `SelectedValues` из `FilterPanel` и собрать `FormData` со схемой:
     - comp = "filter"
     - template = "filter"
     - sect_id = текущий `sectionId`
     - Для каждого свойства:
       - PRICE: `filter[<prop_id>][gt]` = min, `filter[<prop_id>][lt]` = max
       - ENUM/STRING: для каждого выбранного значения `filter[<prop_id>][]` = value
       - BOOLEAN: `filter[<prop_id>]` = "1" (true) или удалять ключ (false)

2. API-метод для фильтрации каталога
   - Добавить функцию `postCatalogFilters(form: FormData)` в `src/shared/api/catalogApi.ts`:
     - URL: `${NEXT_PUBLIC_API_URL}<slug>/` (или отдельный endpoint, если требуется)
     - Метод: POST, тело: `form`, заголовки: без `Content-Type` (его поставит браузер для FormData)
   - Вернуть тип `CatalogType` как и у `getCatalog`.

3. Интеграция с виджетом фильтра
   - В `src/widgets/filter-widget/index.tsx` хранить `selected` (можно в `FilterPanel` уже есть) и `items`.
   - На `onChange` фильтра: дебаунс 300–500 мс, собрать `FormData`, выполнить POST, обновить `items`.
   - Прокинуть обновлённые `items` в `ProductListWidget` (перенести его внутрь `FilterWidget` или пробросить наверх через колбэк).

4. Сохранение состояния в URL (опционально, но желательно)
   - Кодировать выбранные значения в query-параметрах.
   - На маунт — парсить URL и заполнять `initial` для `FilterPanel`.

5. Юнит-проверки и ручное тестирование
   - Тест конвертации `SelectedValues` -> `FormData` для всех типов (ENUM, PRICE, BOOLEAN).
   - Проверить, что диапазон цен корректно формируется как `gt/lt`.
   - Проверить обновление товаров и отображение количества.

6. Производительность и UX
   - Дебаунс запросов при перетаскивании слайдера цены.
   - Блокировка UI при запросе (спиннер), отмена предыдущего запроса при новом выборе.
