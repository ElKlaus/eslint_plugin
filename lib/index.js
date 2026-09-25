/**
 * @fileoverview ESLint-плагин для Feature-Sliced Design
 * @author Sergey Kirov
 */
"use strict";

module.exports = {
  rules: {
    'path-checker': require('./rules/path-checker'),
  },
};
