src/shared/styles/
├── base/
│ ├── \_reset.scss # Сброс стилей (например, normalize.css)
│ ├── \_typography.scss # Типографика: h1–h6, p, текстовые классы
│ └── \_globals.scss # Базовые глобальные стили
├── themes/
│ └── \_light.scss # Цветовая тема по умолчанию
│ └── \_dark.scss # Тёмная тема (если используешь)
├── tokens/
│ ├── \_colors.scss # Цветовые переменные
│ ├── \_spacing.scss # Отступы, размеры
│ ├── \_typography.scss # Типографические переменные (размеры, веса)
│ └── \_z-index.scss # Z-индексы
├── mixins/
│ ├── \_media.scss # Миксины для media queries
│ ├── \_flex.scss # Быстрые миксины для flex
│ └── \_typography.scss # Миксины для типографики
├── utils/
│ └── \_functions.scss # Вспомогательные SCSS-функции
│ └── \_placeholders.scss # %placeholder'ы
├── index.scss # Центральный SCSS-файл для импорта всех выше
