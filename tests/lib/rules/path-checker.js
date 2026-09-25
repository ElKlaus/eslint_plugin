"use strict";

const rule = require('../../../lib/rules/path-checker');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

const ARTICLE_FILE_POSIX = '/home/user/project/src/entities/Article/ui/ArticleCard.tsx';
const ARTICLE_FILE_WIN = 'C:\\project\\src\\entities\\Article\\ui\\ArticleCard.tsx';

ruleTester.run('path-checker', rule, {
  valid: [
    {
      // Относительный импорт внутри слайса
      filename: ARTICLE_FILE_POSIX,
      code: "import { addCommentFormActions } from '../../model/slices/addCommentFormSlice'",
    },
    {
      // Абсолютный импорт из другого слайса того же слоя
      filename: ARTICLE_FILE_POSIX,
      code: "import { User } from 'entities/User'",
    },
    {
      // Абсолютный импорт из другого слоя
      filename: ARTICLE_FILE_POSIX,
      code: "import { Button } from 'shared/ui/Button'",
    },
    {
      // Сторонний пакет
      filename: ARTICLE_FILE_POSIX,
      code: "import React from 'react'",
    },
    {
      // Файл вне src
      filename: '/home/user/project/config/jest/setup.ts',
      code: "import { Article } from 'entities/Article'",
    },
  ],

  invalid: [
    {
      // Абсолютный импорт внутри своего слайса (POSIX-путь)
      filename: ARTICLE_FILE_POSIX,
      code: "import { ArticleView } from 'entities/Article/model/types/article'",
      errors: [{ messageId: 'shouldBeRelative' }],
    },
    {
      // То же для Windows-пути
      filename: ARTICLE_FILE_WIN,
      code: "import { ArticleView } from 'entities/Article/model/types/article'",
      errors: [{ messageId: 'shouldBeRelative' }],
    },
  ],
});
