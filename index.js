#!/usr/bin/env node

// https://github.com/saojs/sao/blob/v1.7.1/bin/cli.js
// and https://github.com/saojs/sao/blob/master/bin/cli.js

const cli = require("cac")();
const sao = require("sao");
const pkg = require("./package.json");

const generatorPrefix = 'PublicI';
const generatorSuffix = 'template';

cli
  .command('<template> [outDir]', 'Generate a template')
  .action((generator, outDir, flags) => {
    const options = Object.assign(
      {
      generator: `${generatorPrefix}/${generator}-${generatorSuffix}`,
        outDir: outDir || ".",
        updateCheck: true,
      },
      flags
    );

    return sao(options).run().catch(sao.handleError);
  })
  .option("-y, --yes", "Use the default options")
  .option("--debug", "Show debug logs");

cli.help();
cli.version(pkg.version);

cli.parse();
