/* eslint-env node */
const { Grammar, Parser } = require("nearley/lib/nearley.js");
const compile = require("nearley/lib/compile.js");
const generate = require("nearley/lib/generate.js");
const lint = require("nearley/lib/lint");
const rawGrammar = require("nearley/lib/nearley-language-bootstrapped.js");

const nearleyGrammar = Grammar.fromCompiled(rawGrammar);

module.exports = function (input) {
  var parser = new Parser(nearleyGrammar);
  parser.feed(input);
  var compilation = compile(parser.results[0], { file: this.resourcePath });
  lint(compilation, {});
  return generate(compilation, "grammar");
};
