# Относительные импорты внутри слайса FSD (`path-checker`)

В архитектуре [Feature-Sliced Design](https://feature-sliced.design/) код делится на слои (`shared`, `entities`, `features`, `widgets`, `pages`), а слои — на слайсы (`entities/Article`, `features/AuthByUsername`).

Внутри одного слайса модули должны импортировать друг друга **относительными путями**. Абсолютный путь (`entities/Article/...`) внутри самого `entities/Article` создаёт ложную зависимость слайса от собственного публичного пути: его сложнее переносить и переименовывать, а при импорте через публичный API (`index.ts`) легко получить циклическую зависимость.

## Описание

Правило срабатывает, если файл из `src/<слой>/<слайс>/...` импортирует модуль по абсолютному пути, начинающемуся с того же `<слой>/<слайс>`.

Примеры **неправильного** кода:

```js
// src/entities/Article/ui/ArticleCard/ArticleCard.tsx
import { ArticleView } from 'entities/Article/model/types/article';
```

Примеры **правильного** кода:

```js
// src/entities/Article/ui/ArticleCard/ArticleCard.tsx
import { ArticleView } from '../../model/types/article'; // свой слайс — относительно
import { User } from 'entities/User';                    // другой слайс
import { Button } from 'shared/ui/Button';               // другой слой
import React from 'react';                               // внешний пакет
```

Файлы вне `src` правило не проверяет. Пути обрабатываются одинаково в Windows, Linux и macOS.

### Настройки

Нет.

## Когда отключать

Если проект не использует Feature-Sliced Design или абсолютные импорты настроены не от папки `src`.
