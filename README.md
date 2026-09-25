# eslint-plugin-kirov-sv-plugin

ESLint-плагин для проектов на архитектуре [Feature-Sliced Design](https://feature-sliced.design/).

Правило `path-checker` следит, чтобы импорты **внутри одного слайса** были относительными, а абсолютные пути использовались только между слайсами и слоями. Это сохраняет изоляцию слайсов и упрощает их перенос и рефакторинг.

```ts
// src/entities/Article/ui/ArticleCard.tsx

import { ArticleView } from 'entities/Article/model/types/article'; // ❌ свой слайс — нужен относительный путь
import { ArticleView } from '../model/types/article';               // ✅
import { User } from 'entities/User';                               // ✅ другой слайс
import { Button } from 'shared/ui/Button';                          // ✅ другой слой
```

Поддерживаются слои `shared`, `entities`, `features`, `widgets`, `pages`. Пути файлов обрабатываются одинаково в Windows, Linux и macOS.

## Установка

```bash
npm install --save-dev eslint eslint-plugin-kirov-sv-plugin
```

## Настройка

`.eslintrc`:

```json
{
  "plugins": ["kirov-sv-plugin"],
  "rules": {
    "kirov-sv-plugin/path-checker": "error"
  }
}
```

## Правила

| Правило | Описание |
|---|---|
| [`path-checker`](docs/rules/path-checker.md) | Относительные импорты внутри одного слайса FSD |

## Разработка

```bash
npm install
npm test
```

Тесты написаны на `RuleTester` из ESLint и покрывают POSIX- и Windows-пути.
