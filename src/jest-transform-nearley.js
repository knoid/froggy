/* eslint-env node */
const { Grammar, Parser } = require("nearley");
const compile = require("nearley/lib/compile.js");
const generate = require("nearley/lib/generate.js");
const lint = require("nearley/lib/lint");
const rawGrammar = require("nearley/lib/nearley-language-bootstrapped.js");

const parserGrammar = Grammar.fromCompiled(rawGrammar);

module.exports = {
  process(fileContent) {
    const parser = new Parser(parserGrammar);
    parser.feed(fileContent);
    const compilation = compile(parser.results[0], { file: this.resourcePath });
    lint(compilation, {
      out: {
        write(msg) {
          console.log(msg.trim());
        },
      },
    });
    const result = generate(compilation, "grammar");
    return result;
  },
};
