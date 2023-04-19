"use strict";

const path = require('path');

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "feature sliced relative path checker",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {

    return {
      ImportDeclaration(node) {
        // lib\rules\path-checker.js
        const importTo = node.source.value;

        // F:\domains1\eslint-plugin\lib\rules\path-checker.js
        const fromFilename = context.getFilename();

        context.report(node, 'ЛИНТЕР РУГАЕТСЯ');
      }
    };
  },
};

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../');
}

function shouldBeRelative(from, to) {

}

console.log();