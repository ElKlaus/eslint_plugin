"use strict";

const path = require('path');

const LAYERS = new Set(['entities', 'features', 'shared', 'pages', 'widgets']);

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Внутри одного слайса Feature-Sliced Design импорты должны быть относительными',
      recommended: false,
      url: 'https://github.com/ElKlaus/eslint_plugin/blob/master/docs/rules/path-checker.md',
    },
    fixable: null,
    schema: [],
    messages: {
      shouldBeRelative: 'В рамках одного слайса все пути должны быть относительными',
    },
  },

  create(context) {
    const filename = context.filename ?? context.getFilename();

    return {
      ImportDeclaration(node) {
        if (shouldBeRelative(filename, node.source.value)) {
          context.report({ node, messageId: 'shouldBeRelative' });
        }
      },
    };
  },
};

function isPathRelative(importPath) {
  return importPath === '.' || importPath.startsWith('./') || importPath.startsWith('../');
}

// Разбирает путь файла на слой и слайс относительно папки src (работает с / и \)
function getLayerAndSlice(filename) {
  const parts = path.normalize(filename).split(/[\\/]/);
  const srcIndex = parts.lastIndexOf('src');
  if (srcIndex === -1) {
    return {};
  }
  return { layer: parts[srcIndex + 1], slice: parts[srcIndex + 2] };
}

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false;
  }

  const [toLayer, toSlice] = to.split('/');
  if (!toSlice || !LAYERS.has(toLayer)) {
    return false;
  }

  const { layer: fromLayer, slice: fromSlice } = getLayerAndSlice(from);
  if (!fromSlice || !LAYERS.has(fromLayer)) {
    return false;
  }

  return fromLayer === toLayer && fromSlice === toSlice;
}
