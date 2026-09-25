/**
 * @fileoverview ESLint-плагин для Feature-Sliced Design
 * @author Sergey Kirov
 */
"use strict";

const { name, version } = require('../package.json');

module.exports = {
  meta: { name, version },
  rules: {
    'path-checker': require('./rules/path-checker'),
  },
};
